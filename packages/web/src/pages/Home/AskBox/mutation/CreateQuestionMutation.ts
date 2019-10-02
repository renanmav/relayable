import { graphql, commitMutation } from 'react-relay'

import env from '@yotta/web/src/relay/Environment'

import {
  CreateQuestionInput,
  CreateQuestionMutationResponse,
  CreateQuestionMutation,
} from './__generated__/CreateQuestionMutation.graphql'

const mutation = graphql`
  mutation CreateQuestionMutation($input: CreateQuestionInput!) {
    CreateQuestion(input: $input) {
      error
    }
  }
`

function commit(
  input: CreateQuestionInput,
  onCompleted: (response: CreateQuestionMutationResponse) => void,
  onError: (error: Error) => void
) {
  return commitMutation<CreateQuestionMutation>(env, {
    mutation,
    variables: { input },
    onCompleted,
    onError,
  })
}

export default { commit }
