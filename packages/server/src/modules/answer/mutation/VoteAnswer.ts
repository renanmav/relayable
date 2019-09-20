/* eslint-disable eqeqeq */
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql'

import { GraphQLContext } from '../../../TypeDefinitions'
import AnswerModel from '../AnswerModel'
import AnswerType from '../AnswerType'

export default mutationWithClientMutationId({
  name: 'VoteAnswer',
  description:
    'Mutation to up/down vote a answer\n\nEach user vote only once (and can change his vote)',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    up: { type: GraphQLBoolean },
    down: { type: GraphQLBoolean },
  },
  mutateAndGetPayload: async (data, { user }: GraphQLContext) => {
    if (!user) return { error: 'You must be authenticated' }

    const { id } = fromGlobalId(data.id)

    const answer = await AnswerModel.findById(id)
    if (!answer) return { error: "Answer doesn't exists" }

    const { up, down } = data

    if (up && down) {
      return { error: 'You should vote up or down or remove your vote' }
    }

    if (up) {
      // verifies if the user voted down
      if (answer.downvotes.includes(user._id)) {
        answer.downvotes = answer.downvotes.filter(id => id.toString() != user._id)
      }

      // verifies if the user already voted up
      if (answer.upvotes.includes(user._id)) {
        return { error: 'You already have voted up on this answer' }
      }

      answer.upvotes.push(user)

      await answer.save()

      return { id: answer._id }
    }

    if (down) {
      // verifies if the user voted up
      if (answer.upvotes.includes(user._id)) {
        answer.upvotes = answer.upvotes.filter(id => id.toString() != user._id)
      }

      // verifies if the user already voted down
      if (answer.downvotes.includes(user._id)) {
        return { error: 'You already have voted down on this answer' }
      }

      answer.downvotes.push(user)

      await answer.save()

      return { id: answer._id }
    }

    // remove vote
    answer.upvotes = answer.upvotes.filter(id => id.toString() != user._id)
    answer.downvotes = answer.downvotes.filter(id => id.toString() != user._id)

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
