import { GraphQLObjectType } from 'graphql'

import UserMutations from '../modules/user/mutation'
import QuestionMutations from '../modules/question/mutation'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...QuestionMutations
  })
})
