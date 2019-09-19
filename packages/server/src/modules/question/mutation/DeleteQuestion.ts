import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql'

import { GraphQLContext } from '../../../TypeDefinitions'
import QuestionModel from '../QuestionModel'

export default mutationWithClientMutationId({
  name: 'DeleteQuestion',
  description: 'Use this mutation to delete a question if you owns it',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  mutateAndGetPayload: async (data, { user }: GraphQLContext) => {
    if (!user) return { error: 'You must be authenticated' }

    const { id } = fromGlobalId(data.id)

    const question = await QuestionModel.findById(id)
    if (!question) return { error: "Question doesn't exists" }

    // eslint-disable-next-line eqeqeq
    if (question.author.toString() != user._id) {
      return { error: "You don't own this question" }
    }

    await QuestionModel.findByIdAndDelete(id)

    return { error: null }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: obj => obj.error,
    },
  },
})
