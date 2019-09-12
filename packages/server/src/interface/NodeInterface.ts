/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLObjectType } from 'graphql'
import { nodeDefinitions, fromGlobalId } from 'graphql-relay'
import DataLoader from 'dataloader'

import * as loaders from '../loader'
import { GraphQLContext } from '../TypeDefinitions'

type RegisteredTypes = {
  [key: string]: GraphQLObjectType
}
const registeredTypes: RegisteredTypes = {}

export function registerType (type: GraphQLObjectType) {
  registeredTypes[type.name] = type
  return type
}

type Loader = {
  load: (ctx: GraphQLContext, id: string) => Promise<any>
  getLoader: () => DataLoader<string, any>
}

export type Loaders = {
  [key: string]: Loader
}

export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId, ctx: GraphQLContext) => {
    const { type, id } = fromGlobalId(globalId)
    const loader: Loader = (loaders as Loaders)[`${type}Loader`]

    return (loader && loader.load(ctx, id)) || null
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  (obj: Object) => registeredTypes[obj.constructor.name] || null
)
