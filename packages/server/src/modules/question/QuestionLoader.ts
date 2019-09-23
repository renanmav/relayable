/* eslint-disable @typescript-eslint/no-explicit-any */
import DataLoader from 'dataloader'
import { mongooseLoader, connectionFromMongoCursor } from '@entria/graphql-mongoose-loader'
import { ConnectionArguments, fromGlobalId } from 'graphql-relay'
import moment, { duration } from 'moment'

import User from '../user/UserLoader'
import { IUser } from '../user/UserModel'
import Answer from '../answer/AnswerLoader'

import QuestionModel, { IQuestion } from './QuestionModel'

import { GraphQLContext } from 'server/src/TypeDefinitions'

export default class Question {
  id: string
  _id: string
  title: string
  content: string
  upvotes: IUser[]
  downvotes: IUser[]
  views: IUser[]
  anonymous_views: number
  tags: string[] | undefined
  author: User
  answers: Answer[]
  createdAt: any
  updatedAt: any

  constructor(data: Partial<IQuestion>) {
    this.id = data.id
    this._id = data._id
    this.title = data.title!
    this.content = data.content!
    this.upvotes = data.upvotes || []
    this.downvotes = data.downvotes || []
    this.views = data.views || []
    this.anonymous_views = data.anonymous_views || 0
    this.tags = data.tags
    this.author = data.author! as User
    this.answers = data.answers! as Answer[]
    this.createdAt = data.createdAt!
    this.updatedAt = data.updatedAt!
  }
}

export const getLoader = () =>
  new DataLoader((ids: ReadonlyArray<string>) => mongooseLoader(QuestionModel, ids))

const viewerCanSee = (_: GraphQLContext, data: IQuestion | null) => {
  if (!data) return null

  return new Question(data)
}

export const load = async (context: GraphQLContext, id: any): Promise<Question | null> => {
  if (!id) return null

  let data
  try {
    data = await context.dataloaders.QuestionLoader.load(id as string)
  } catch (err) {
    return null
  }

  return viewerCanSee(context, data)
}

type QuestionArgs = ConnectionArguments & {
  authorId?: string
  search?: string
}

export const loadQuestions = async (context: GraphQLContext, args: QuestionArgs) => {
  const { authorId, search } = args

  let where = {}

  const searchWords = []
  if (search) {
    const strArr = search.split(' ')
    let regexStr = ''
    strArr.forEach(word => {
      regexStr += `(.*${word}.*)|`
    })
    const $regex = new RegExp(regexStr.slice(0, -1), 'ig')
    searchWords.push({ title: { $regex } })
    searchWords.push({ content: { $regex } })
    searchWords.push({ tags: { $regex } })
    where = { $or: searchWords }
  }
  if (authorId) {
    searchWords.length
      ? (where = {
        $and: [{ author: fromGlobalId(authorId).id }, { $or: searchWords }],
      })
      : (where = { author: fromGlobalId(authorId).id })
  }

  const questions = QuestionModel.find(where)

  return connectionFromMongoCursor({
    cursor: questions,
    context,
    args,
    loader: load,
  })
}

export const loadAverageResponse = async () => {
  let media: moment.Duration

  try {
    const aggregation = await QuestionModel.aggregate([
      {
        $group: {
          _id: null,
          avg_time: {
            $avg: {
              $subtract: [{ $ifNull: ['$time_first_answer', 0] }, { $ifNull: ['$createdAt', 0] }],
            },
          },
        },
      },
    ])
    media = duration(aggregation[0].avg_time)
  } catch (err) {
    media = duration(0)
  }

  return media.humanize()
}
