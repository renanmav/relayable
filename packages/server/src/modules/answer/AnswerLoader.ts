/* eslint-disable @typescript-eslint/no-explicit-any */
import DataLoader from 'dataloader'
import { mongooseLoader } from '@entria/graphql-mongoose-loader'
import mongoose, { Types } from 'mongoose'

import User from '../user/UserLoader'
import { GraphQLContext } from 'server/src/TypeDefinitions'
import { IUser } from '../user/UserModel'
import AnswerModel, { IAnswer } from './AnswerModel'

declare type ObjectId = mongoose.Schema.Types.ObjectId
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
  new DataLoader((ids: ReadonlyArray<string>) =>
    mongooseLoader(AnswerModel, ids)
  )

const viewerCanSee = ({ user }: GraphQLContext, data: IAnswer | null) => {
  if (!data) return null

  if (!user) throw new Error('must be authenticated')

  return new Answer(data)
}

export const load = async (
  context: GraphQLContext,
  // eslint-disable-next-line @typescript-eslint/ban-types
  id: string | Object | ObjectId
): Promise<Answer | null> => {
  if (!id && typeof id !== 'string') {
    return null
  }

  let data
  try {
    data = await context.dataloaders.AnswerLoader.load(id as string)
  } catch (err) {
    return null
  }

  return viewerCanSee(context, data)
}

export const clearCache = (
  { dataloaders }: GraphQLContext,
  id: Types.ObjectId
) => dataloaders.AnswerLoader.clear(id.toString())
export const primeCache = (
  { dataloaders }: GraphQLContext,
  id: Types.ObjectId,
  data: IAnswer
) => dataloaders.AnswerLoader.prime(id.toString(), data)
export const clearAndPrimeCache = (
  context: GraphQLContext,
  id: Types.ObjectId,
  data: IAnswer
) => clearCache(context, id) && primeCache(context, id, data)
