import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import { globalIdField, connectionDefinitions } from 'graphql-relay'

import { registerType, nodeInterface } from '../../interface/NodeInterface'
import postInterface from '../../interface/PostInterface'
import { IQuestion } from './QuestionModel'
import UserType from '../user/UserType'
import AnswerType from '../answer/AnswerType'
import UserModel from '../user/UserModel'

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
        resolve: q => q.upvotes.length
      },
      downvotes: {
        type: GraphQLInt,
        resolve: q => q.downvotes.length
      },
      views: {
        type: GraphQLInt,
        resolve: q => q.views.length
      },
      tags: {
        type: GraphQLList(GraphQLString),
        resolve: q => q.tags
      },
      author: {
        type: UserType,
        resolve: async q => {
          const author = await UserModel.findById(q.author)
          if (!author) throw new Error("This author doesn't exists")
          return author
        }
      },
      answers: {
        type: GraphQLList(AnswerType),
        resolve: q => q.answers
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

export const QuestionConnection = connectionDefinitions({
  name: 'Question',
  nodeType: QuestionType
})
