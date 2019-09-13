import DataLoader from 'dataloader'
import { mongooseLoader } from '@entria/graphql-mongoose-loader'

import User from '../user/UserLoader'
import QuestionModel, { IQuestion } from './QuestionModel'
import { GraphQLContext } from 'server/src/TypeDefinitions'
import UserModel from '../user/UserModel'

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
  createdAt: string
  updatedAt: string

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
  if (!data || !user) return null

  return new Question(data)
}

export const load = async (
  context: GraphQLContext,
  id: string
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
