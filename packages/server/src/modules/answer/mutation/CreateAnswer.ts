import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql'

import { GraphQLContext } from '../../../TypeDefinitions'
import AnswerModel, { IAnswer } from '../AnswerModel'
import AnswerType from '../AnswerType'
import QuestionModel from '../../question/QuestionModel'

export default mutationWithClientMutationId({
  name: 'CreateAnswer',
  description: 'Use this mutation to answer a question',
  inputFields: {
    question: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the question',
    },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (data, { user }: GraphQLContext) => {
    if (!user) return { error: 'You must be authenticated' }

    const { id } = fromGlobalId(data.question)
    const question = await QuestionModel.findById(id)
    if (!question) return { error: "This question doesn't exists" }

    const answer = new AnswerModel({ ...data, author: user, question })
    await answer.save()

    question.answers.push(answer as IAnswer & string)
    await question.save()

    return { id: answer._id }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: obj => obj.error,
    },
    answer: {
      type: AnswerType,
      resolve: async (
        { id },
        _,
        { dataloaders: { AnswerLoader } }: GraphQLContext
      ) => (id ? AnswerLoader.load(id) : null),
    },
  },
})
