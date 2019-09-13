import { PubSub } from 'graphql-subscriptions'

export const EVENTS = {
  QUESTION: {
    NEW: 'NEW_QUESTION'
  }
}

export default new PubSub()
