import { mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLNonNull, GraphQLString } from 'graphql'

import { requestGithubUser, GithubUserResponse } from './helpers'

export default mutationWithClientMutationId({
  name: 'LoginWithGithub',
  inputFields: {
    code: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async (
    { code }
  ) => requestGithubUser({
    client_id: process.env.GITHUB_CLIENT_ID as string,
    client_secret: process.env.GITHUB_CLIENT_SECRET as string,
    code
  }),
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: (obj: GithubUserResponse) => {
        console.log(obj)
        return obj.access_token
      }
    }
  }
})
