import { GraphQLObjectType } from 'graphql'

import QuestionSubscriptions from '../modules/question/subscription'

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...QuestionSubscriptions
  }
})
