import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { QuestionConnection } from '../QuestionType'
import { offsetToCursor } from 'graphql-relay'
import pubSub, { EVENTS } from '../../../pubSub'
import { getUser } from '../../../auth'

const NewQuestionPayloadType = new GraphQLObjectType({
  name: 'NewQuestionPayload',
  fields: () => ({
    edge: {
      type: QuestionConnection.edgeType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async ({ question }, { token }) => {
        const { user } = await getUser(token)

        if (!user) return null

        return {
          cursor: offsetToCursor(question.id),
          node: question
        }
      }
    }
  })
})

const newQuestionSubscription = {
  type: NewQuestionPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.QUESTION.NEW)
}

export default newQuestionSubscription
