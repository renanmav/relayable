/* eslint-disable eqeqeq */
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql'

import { GraphQLContext } from '../../../TypeDefinitions'
import AnswerModel, { IAnswer } from '../AnswerModel'
import QuestionModel from '../../question/QuestionModel'
import AnswerType from '../AnswerType'

export default mutationWithClientMutationId({
  name: 'AcceptAnswer',
  description:
    'Mutation to accept the answer\n' +
    'Only the owner of the question can accept the answer\n' +
    'Only one answer can be accepted',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  mutateAndGetPayload: async (data, { user }: GraphQLContext) => {
    if (!user) return { error: 'You must be authenticated' }

    const { id } = fromGlobalId(data.id)

    const answer = await AnswerModel.findById(id)
    if (!answer) return { error: "Answer doesn't exists" }

    const question = await QuestionModel.findById(answer.question)
    if (!question) return { error: "Question doesn't exists" }

    if (question.author.toString() != user._id) {
      return { error: "You don't own this question to accept this answer" }
    }

    if (answer.is_accepted) return { error: 'This answer its already accepted' }

    const _question = await question.populate('answers').execPopulate()

    // @ts-ignore
    const denyAllAnswers = _question.answers.map(async (answer: IAnswer) => {
      answer.is_accepted = false
      await answer.save()
    })

    return Promise.all(denyAllAnswers).then(async () => {
      answer.is_accepted = true
      await answer.save()
      return { id: answer._id }
    })
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
