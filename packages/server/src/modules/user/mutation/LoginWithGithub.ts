import { mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLNonNull, GraphQLString } from 'graphql'

import { requestGithubUser } from './helpers'
import UserModel from '../UserModel'

export default mutationWithClientMutationId({
  name: 'LoginWithGithub',
  inputFields: {
    code: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async (
    { code }
  ) => {
    const user = await requestGithubUser({
      client_id: process.env.GITHUB_CLIENT_ID as string,
      client_secret: process.env.GITHUB_CLIENT_SECRET as string,
      code
    })

    const { id, name, login, avatar_url, access_token: token } = user

    let userDb = await UserModel.findOne({ login: user.login })

    if (userDb) {
      return { user: userDb, token }
    }

    userDb = new UserModel({
      github_id: id,
      name,
      login,
      avatar_url
    })

    await userDb.save()

    return { user: userDb, token }
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: (obj) => obj.token
    }
  }
})
