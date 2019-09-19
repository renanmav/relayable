import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { offsetToCursor } from 'graphql-relay'

import { QuestionConnection } from '../QuestionType'
import pubSub, { EVENTS } from '../../../pubSub'
import { getUser } from '../../../auth'

const NewViewPayloadType = new GraphQLObjectType({
  name: 'NewViewPayload',
  fields: () => ({
    edge: {
      type: QuestionConnection.edgeType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async ({ question }, { token }) => {
        const { user } = await getUser(token)

        if (!user) return null

        return {
          cursor: offsetToCursor(question.id),
          node: question,
        }
      },
    },
  }),
})

const newViewSubscription = {
  type: NewViewPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.QUESTION.NEW_VIEW),
}

export default newViewSubscription
