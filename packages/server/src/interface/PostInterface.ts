import { GraphQLInterfaceType, GraphQLString, GraphQLInt } from 'graphql'
import UserType from '../modules/user/UserType'

const PostType = new GraphQLInterfaceType({
  name: 'Post',
  description: 'Post interface to enforce some fields',
  fields: () => ({
    content: { type: GraphQLString },
    upvotes: { type: GraphQLInt },
    downvotes: { type: GraphQLInt },
    author: { type: UserType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default PostType
