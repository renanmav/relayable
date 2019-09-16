import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'
import { globalIdField, fromGlobalId } from 'graphql-relay'

import { registerType, nodeInterface } from '../../interface/NodeInterface'
import postInterface from '../../interface/PostInterface'
import UserType from '../user/UserType'
import { IAnswer } from './AnswerModel'
import QuestionType from '../question/QuestionType'
import UserModel from '../user/UserModel'
import QuestionModel from '../question/QuestionModel'

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
        resolve: async a => {
          const user = await UserModel.findById(a.author)
          if (!user) throw new Error("This author doesn't exists")
          return user
        }
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
