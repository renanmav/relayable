import DataLoader from 'dataloader'
import {
  mongooseLoader,
  connectionFromMongoCursor
} from '@entria/graphql-mongoose-loader'

import User from '../user/UserLoader'
import QuestionModel, { IQuestion } from './QuestionModel'
import { GraphQLContext } from 'server/src/TypeDefinitions'
import UserModel from '../user/UserModel'
import { ConnectionArguments, toGlobalId, fromGlobalId } from 'graphql-relay'

export default class Question {
  id: string
  _id: string
  title: string
  content: string
  upvotes: number
  downvotes: number
  views: number
  tags: string[] | undefined
  author: User
  createdAt: any
  updatedAt: any

  constructor (data: Partial<IQuestion>) {
    this.id = data.id
    this._id = data._id
    this.title = data.title!
    this.content = data.content!
    this.upvotes = data.upvotes || 0
    this.downvotes = data.downvotes || 0
    this.views = data.views || 0
    this.tags = data.tags
    this.author = data.author! as User
    this.createdAt = data.createdAt!
    this.updatedAt = data.updatedAt!
  }
}

export const getLoader = () =>
  new DataLoader((ids: ReadonlyArray<string>) =>
    mongooseLoader(QuestionModel, ids)
  )

const viewerCanSee = ({ user }: GraphQLContext, data: IQuestion | null) => {
  if (!data) return null

  if (!user) throw new Error('must be authenticated')

  return new Question(data)
}

export const load = async (
  context: GraphQLContext,
  id: any
): Promise<Question | null> => {
  if (!id) {
    return null
  }

  let data
  try {
    data = await context.dataloaders.QuestionLoader.load(id)
  } catch (err) {
    return null
  }

  const author = await UserModel.findById(data.author)

  data.author = author!

  return viewerCanSee(context, data)
}

type QuestionArgs = ConnectionArguments & {
  authorId?: string
}

export const loadQuestions = async (
  context: GraphQLContext,
  args: QuestionArgs
) => {
  const where = args.authorId ? { author: fromGlobalId(args.authorId).id } : {}
  const questions = QuestionModel.find(where).sort({ createdAt: -1 })

  return connectionFromMongoCursor({
    cursor: questions,
    context,
    args,
    loader: load
  })
}
