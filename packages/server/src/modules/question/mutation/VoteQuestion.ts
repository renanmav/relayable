/* eslint-disable eqeqeq */
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql'

import { GraphQLContext } from '../../../TypeDefinitions'
import QuestionModel from '../QuestionModel'
import QuestionType from '../QuestionType'
import { EVENTS } from '../../../pubSub'

export default mutationWithClientMutationId({
  name: 'VoteQuestion',
  description:
    'Mutation to up/down vote a question\n\nEach user vote only once (and can change his vote)',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    up: { type: GraphQLBoolean },
    down: { type: GraphQLBoolean }
  },
  mutateAndGetPayload: async (data, { user, pubSub }: GraphQLContext) => {
    if (!user) return { error: 'You must be authenticated' }

    const { id } = fromGlobalId(data.id)

    const question = await QuestionModel.findById(id)
    if (!question) return { error: "Question doesn't exists" }

    const { up, down } = data

    if (up && down) {
      return { error: 'You should vote up or down or remove your vote' }
    }

    if (up) {
      // verifies if the user voted down
      if (question.downvotes.includes(user._id)) {
        question.downvotes = question.downvotes.filter(
          id => id.toString() != user._id
        )
      }

      // verifies if the user already voted up
      if (question.upvotes.includes(user._id)) {
        return { error: 'You already have voted up on this question' }
      }

      question.upvotes.push(user)

      await question.save()

      pubSub.publish(EVENTS.QUESTION.NEW_VOTE, { NewVote: { question } })

      return { question }
    }

    if (down) {
      // verifies if the user voted up
      if (question.upvotes.includes(user._id)) {
        question.upvotes = question.upvotes.filter(
          id => id.toString() != user._id
        )
      }

      // verifies if the user already voted down
      if (question.downvotes.includes(user._id)) {
        return { error: 'You already have voted down on this question' }
      }

      question.downvotes.push(user)

      await question.save()

      pubSub.publish(EVENTS.QUESTION.NEW_VOTE, { NewVote: { question } })

      return { question }
    }

    // remove vote
    question.upvotes = question.upvotes.filter(id => id.toString() != user._id)
    question.downvotes = question.downvotes.filter(
      id => id.toString() != user._id
    )

    await question.save()

    pubSub.publish(EVENTS.QUESTION.NEW_VOTE, { NewVote: { question } })

    return { id: question._id }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: obj => obj.error
    },
    question: {
      type: QuestionType,
      resolve: async (
        { id },
        _,
        { dataloaders: { QuestionLoader } }: GraphQLContext
      ) => QuestionLoader.load(id)
    }
  }
})
