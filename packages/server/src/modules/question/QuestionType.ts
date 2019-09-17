import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import { globalIdField, connectionDefinitions } from 'graphql-relay'
import { orderBy } from 'lodash'

import { registerType, nodeInterface } from '../../interface/NodeInterface'
import postInterface from '../../interface/PostInterface'
import { IQuestion } from './QuestionModel'
import UserType from '../user/UserType'
import AnswerType from '../answer/AnswerType'
import { GraphQLContext } from '../../TypeDefinitions'
import { IAnswer } from '../answer/AnswerModel'

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
        resolve: async (
          { author },
          _,
          { dataloaders: { UserLoader } }: GraphQLContext
        ) => UserLoader.load(author as string)
      },
      answers: {
        type: GraphQLList(AnswerType),
        resolve: async (
          { answers: ids },
          _,
          { dataloaders: { AnswerLoader } }: GraphQLContext
        ) => {
          const answers = await AnswerLoader.loadMany(ids as string[])
          let _answers: IAnswer[] = orderBy(
            answers,
            answer => answer.upvotes.length,
            'desc'
          )
          _answers = orderBy(_answers, answer => answer.is_accepted, 'desc')
          return _answers
        }
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
