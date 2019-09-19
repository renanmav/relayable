/* eslint-disable @typescript-eslint/no-explicit-any */
import DataLoader from 'dataloader'
import { mongooseLoader } from '@entria/graphql-mongoose-loader'
import { Types } from 'mongoose'

import UserModel, { IUser } from './UserModel'

import { GraphQLContext } from 'server/src/TypeDefinitions'

export default class User {
  id: string
  _id: Types.ObjectId | undefined
  github_id: string | undefined
  name: string
  login: string
  avatar_url: string | undefined

  constructor(data: Partial<IUser>) {
    this.id = data.id
    this._id = data._id
    this.github_id = data.github_id
    this.name = data.name!
    this.login = data.login!
    this.avatar_url = data.avatar_url
  }
}

export const getLoader = () =>
  new DataLoader((ids: ReadonlyArray<string>) => mongooseLoader(UserModel, ids))

const viewerCanSee = (
  { user }: GraphQLContext,
  data: IUser | null
): User | null => {
  if (!data) return null

  if (user && user.github_id === data.github_id) return new User(data)

  const { id, _id, name, login, avatar_url } = data

  return new User({ id, _id, name, login, avatar_url })
}

export const load = async (
  context: GraphQLContext,
  id: any
): Promise<User | null> => {
  if (!id) return null

  let data
  try {
    data = await context.dataloaders.UserLoader.load(id as string)
  } catch (err) {
    return null
  }
  return viewerCanSee(context, data)
}

export const loadByLogin = async (
  context: GraphQLContext,
  login: string
): Promise<User | null> => {
  const user = await UserModel.findOne({ login })

  if (!user) return null

  return viewerCanSee(context, user)
}
