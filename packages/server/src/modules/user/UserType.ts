import { registerType, nodeInterface } from '../../interface/NodeInterface'
import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { IUser } from './UserModel'

const UserType = registerType(
  new GraphQLObjectType<IUser>({
    name: 'User',
    description: 'User data',
    fields: () => ({
      id: globalIdField('User', (user: IUser) => user._id),
      _id: {
        type: GraphQLString,
        resolve: user => user._id
      },
      github_id: {
        type: GraphQLString,
        resolve: user => user.github_id
      },
      name: {
        type: GraphQLString,
        resolve: user => user.name
      },
      login: {
        type: GraphQLString,
        resolve: user => user.login
      },
      avatar_url: {
        type: GraphQLString,
        resolve: user => user.avatar_url
      }
    }),
    interfaces: [nodeInterface]
  })
)

export default UserType
