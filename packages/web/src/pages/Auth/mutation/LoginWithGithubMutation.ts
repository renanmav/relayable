import { graphql, commitMutation } from 'react-relay'
import { Environment } from '@yotta/web/src/relay'

import {
  LoginWithGithubInput,
  LoginWithGithubMutationResponse,
  LoginWithGithubMutation,
} from './__generated__/LoginWithGithubMutation.graphql'

const mutation = graphql`
  mutation LoginWithGithubMutation($input: LoginWithGithubInput!) {
    LoginWithGithub(input: $input) {
      token
      user {
        id
        _id
        github_id
        name
        login
        avatar_url
      }
    }
  }
`

function commit(
  input: LoginWithGithubInput,
  onCompleted: (response: LoginWithGithubMutationResponse) => void,
  onError: (error: Error) => void
) {
  return commitMutation<LoginWithGithubMutation>(Environment, {
    mutation,
    variables: { input },
    onCompleted,
    onError,
  })
}

export default { commit }
