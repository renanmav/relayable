import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql'

import { GraphQLContext } from '../../../TypeDefinitions'
import AnswerModel from '../AnswerModel'
import AnswerType from '../AnswerType'

export default mutationWithClientMutationId({
  name: 'EditAnswer',
  description: 'Mutation to edit the answer if logged in user is the author',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (data, { user }: GraphQLContext) => {
    if (!user) return { error: 'You must be authenticated' }

    const { id } = fromGlobalId(data.id)

    const answer = await AnswerModel.findById(id)
    if (!answer) return { error: "Answer doesn't exists" }

    // eslint-disable-next-line eqeqeq
    if (answer.author.toString() != user._id) {
      return { error: "You don't own this answer" }
    }

    answer.content = data.content

    await answer.save()

    return { id: answer._id }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: obj => obj.error,
    },
    answer: {
      type: AnswerType,
      resolve: async ({ id }, _, { dataloaders: { AnswerLoader } }: GraphQLContext) =>
        (id ? AnswerLoader.load(id) : null),
    },
  },
})
