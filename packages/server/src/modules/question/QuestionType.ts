import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { registerType, nodeInterface } from '../../interface/NodeInterface'
import postInterface from '../../interface/PostInterface'
import { IQuestion } from './QuestionModel'
import UserType from '../user/UserType'

const QuestionType = registerType(
  new GraphQLObjectType<IQuestion>({
    name: 'Question',
    description: 'Question data',
    fields: () => ({
      id: globalIdField('Question', (q: IQuestion) => q._id),
      _id: {
        type: GraphQLString,
        resolve: q => q._id
      },
      title: {
        type: GraphQLString,
        resolve: q => q.title
      },
      content: {
        type: GraphQLString,
        resolve: q => q.content
      },
      upvotes: {
        type: GraphQLInt,
        resolve: q => q.upvotes
      },
      downvotes: {
        type: GraphQLInt,
        resolve: q => q.downvotes
      },
      views: {
        type: GraphQLInt,
        resolve: q => q.views
      },
      tags: {
        type: GraphQLList(GraphQLString),
        resolve: q => q.tags
      },
      author: {
        type: UserType,
        resolve: q => q.author
      },
      createdAt: {
        type: GraphQLString,
        resolve: q => q.createdAt.toISOString()
      },
      updatedAt: {
        type: GraphQLString,
        resolve: q => q.updatedAt.toISOString()
      }
    }),
    interfaces: [nodeInterface, postInterface]
  })
)

export default QuestionType
