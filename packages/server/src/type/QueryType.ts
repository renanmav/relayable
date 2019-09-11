import { GraphQLObjectType } from 'graphql'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({})
})
