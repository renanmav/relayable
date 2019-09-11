import { mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLNonNull, GraphQLString } from 'graphql'

import { authenticateFacebook } from '../../../passport'
import { GraphQLContext } from '../../../TypeDefinitions'

export default mutationWithClientMutationId({
  name: 'LoginWithFacebook',
  inputFields: {
    accessToken: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async (_, { input: { accessToken } }, ctx) => {
    const { req, res } = (ctx as unknown) as GraphQLContext

    console.log(req, res)

    const response = await authenticateFacebook(req, res)

    console.log(response)
  },
  outputFields: {}
})