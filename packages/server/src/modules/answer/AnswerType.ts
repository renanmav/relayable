import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { registerType, nodeInterface } from '../../interface/NodeInterface'
import postInterface from '../../interface/PostInterface'
import UserType from '../user/UserType'
import { IAnswer } from './AnswerModel'
import QuestionType from '../question/QuestionType'
import { GraphQLContext } from '../../TypeDefinitions'

const AnswerType = registerType(
  new GraphQLObjectType<IAnswer>({
    name: 'Answer',
    description: 'Answer data',
    fields: () => ({
      id: globalIdField('Answer', (a: IAnswer) => a._id),
      _id: {
        type: GraphQLString,
        resolve: a => a._id
      },
      question: {
        type: QuestionType,
        resolve: a => a.question
      },
      content: {
        type: GraphQLString,
        resolve: a => a.content
      },
      upvotes: {
        type: GraphQLInt,
        resolve: a => a.upvotes.length
      },
      downvotes: {
        type: GraphQLInt,
        resolve: a => a.downvotes.length
      },
      is_accepted: {
        type: GraphQLBoolean,
        resolve: a => a.is_accepted
      },
      author: {
        type: UserType,
        resolve: async (
          { author },
          _,
          { dataloaders: { UserLoader } }: GraphQLContext
        ) => UserLoader.load(author as string)
      },
      createdAt: {
        type: GraphQLString,
        resolve: a => a.createdAt.toISOString()
      },
      updatedAt: {
        type: GraphQLString,
        resolve: a => a.updatedAt.toISOString()
      }
    }),
    interfaces: [nodeInterface, postInterface]
  })
)

export default AnswerType
