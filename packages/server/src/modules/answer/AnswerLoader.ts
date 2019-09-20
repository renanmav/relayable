/* eslint-disable @typescript-eslint/no-explicit-any */
import DataLoader from 'dataloader'
import { mongooseLoader } from '@entria/graphql-mongoose-loader'

import User from '../user/UserLoader'
import { IUser } from '../user/UserModel'

import AnswerModel, { IAnswer } from './AnswerModel'

import { GraphQLContext } from 'server/src/TypeDefinitions'

export default class Answer {
  id: string
  _id: string
  content: string
  upvotes: IUser[]
  downvotes: IUser[]
  is_accepted: boolean
  author: User
  createdAt: any
  updatedAt: any

  constructor (data: Partial<IAnswer>) {
    this.id = data.id
    this._id = data._id
    this.content = data.content!
    this.upvotes = data.upvotes || []
    this.downvotes = data.downvotes || []
    this.is_accepted = data.is_accepted!
    this.author = data.author! as User
    this.createdAt = data.createdAt!
    this.updatedAt = data.updatedAt!
  }
}

export const getLoader = () =>
  new DataLoader((ids: ReadonlyArray<string>) => mongooseLoader(AnswerModel, ids))

const viewerCanSee = ({ user }: GraphQLContext, data: IAnswer | null) => {
  if (!data) return null

  if (!user) throw new Error('must be authenticated')

  return new Answer(data)
}

export const load = async (context: GraphQLContext, id: any): Promise<Answer | null> => {
  if (!id) return null

  let data
  try {
    data = await context.dataloaders.AnswerLoader.load(id as string)
  } catch (err) {
    return null
  }

  return viewerCanSee(context, data)
}
