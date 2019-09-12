import DataLoader from 'dataloader'
import { mongooseLoader } from '@entria/graphql-mongoose-loader'
import { Types, Schema } from 'mongoose'
import UserModel, { IUser } from './UserModel'
import { GraphQLContext } from 'server/src/TypeDefinitions'

declare type ObjectId = Schema.Types.ObjectId

export default class User {
  id: string;
  _id: Types.ObjectId
  github_id: string
  name: string
  login: string
  avatar_url: string | undefined

  constructor (data: IUser) {
    this.id = data.id
    this._id = data._id
    this.github_id = data.github_id
    this.name = data.name
    this.login = data.login
    this.avatar_url = data.avatar_url
  }
}

export const getLoader = () =>
  new DataLoader((ids: ReadonlyArray<string>) => mongooseLoader(UserModel, ids))

const viewerCanSee = (
  context: GraphQLContext,
  data: IUser | null
): User | null => {
  if (!data) return null

  return new User(data)
}

export const load = async (
  context: GraphQLContext,
  // eslint-disable-next-line @typescript-eslint/ban-types
  id: string | Object | ObjectId
): Promise<User | null> => {
  if (!id && typeof id !== 'string') {
    return null
  }

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
