import { mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql'

import { GraphQLContext } from '../../../TypeDefinitions'
import AnswerModel from '../AnswerModel'
import AnswerType from '../AnswerType'

export default mutationWithClientMutationId({
  name: 'CreateAnswer',
  description: 'Use this mutation to answer a question',
  inputFields: {
    question: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the question'
    },
    content: { type: new GraphQLNonNull(GraphQLString) }
  },
  mutateAndGetPayload: async (data, { user }: GraphQLContext) => {
    if (!user) return { error: 'You must be authenticated' }

    const answer = new AnswerModel({ ...data, author: user })

    await answer.save()

    return { answer }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: obj => obj.error
    },
    answer: {
      type: AnswerType,
      resolve: obj => obj.answer
    }
  }
})
