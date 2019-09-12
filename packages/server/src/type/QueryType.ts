import { GraphQLObjectType, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    githubLoginUrl: {
      type: GraphQLString,
      resolve: () =>
        `https://github.com/login/oauth/authorize?client_id=${
          process.env.GITHUB_CLIENT_ID
        }&scope=user`
    }
  })
})
