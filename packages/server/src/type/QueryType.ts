import { GraphQLObjectType, GraphQLString } from 'graphql'
import { fromGlobalId } from 'graphql-relay'

import UserType from '../modules/user/UserType'
import { UserLoader } from '../loader'
import { nodeField } from '../interface/NodeInterface'
import { GraphQLContext } from '../TypeDefinitions'
import QuestionType from '../modules/question/QuestionType'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    githubLoginUrl: {
      type: GraphQLString,
      description: 'Use this query to fetch GitHub login URL',
      resolve: () =>
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
    },
    node: nodeField,
    me: {
      type: UserType,
      description: 'Get your own data based on provided Authorization token',
      resolve: (_, __, { user }: GraphQLContext) => user
    },
    user: {
      type: UserType,
      description: 'Fetch a user by its login',
      args: {
        login: { type: GraphQLString }
      },
      resolve: (_, args, context) =>
        UserLoader.loadByLogin(context, args.login)
    }
  })
})
