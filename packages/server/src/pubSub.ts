import { PubSub } from 'graphql-subscriptions'

export const EVENTS = {
  QUESTION: {
    NEW: 'NEW_QUESTION',
    NEW_VIEW: 'NEW_QUESTION_VIEW',
    NEW_VOTE: 'NEW_QUESTION_VOTE',
  },
}

export default new PubSub()
