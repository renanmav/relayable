import { GraphQLObjectType, GraphQLString } from 'graphql'
import UserType from '../modules/user/UserType'
import { UserLoader } from '../loader'
import { fromGlobalId } from 'graphql-relay'
import { nodeField } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    githubLoginUrl: {
      type: GraphQLString,
      resolve: () =>
        `https://github.com/login/oauth/authorize?client_id=${
          process.env.GITHUB_CLIENT_ID
        }&scope=user`
    },
    node: nodeField,
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        },
        login: {
          type: GraphQLString
        }
      },
      resolve: (obj, args, context) => {
        if (args.id) {
          const { id } = fromGlobalId(args.id)
          return UserLoader.load(context, id)
        }

        return UserLoader.loadByLogin(context, args.login)
      }
    }
  })
})
