import { commitMutation, graphql } from 'react-relay'

import { env } from '@yotta/web/src/relay/createQueryRendererModern'
import { MockPayloadGenerator } from 'relay-test-utils'
import { RelayModernEnvironment } from 'relay-runtime/lib/store/RelayModernEnvironment'

it('should get token and user', () => {
  const onCompleted = jest.fn()
  const onError = jest.fn()

  // Fix relay-test-utils: overlap RelayMockEnvironment and RelayModernEnvironment (check https://github.com/DefinitelyTyped/DefinitelyTyped/pull/38831)
  commitMutation((env as unknown) as RelayModernEnvironment, {
    mutation: graphql`
      mutation LoginWithGithubTestMutation {
        LoginWithGithub(input: { code: "somecode" }) {
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
    `,
    onCompleted,
    onError,
    variables: {},
  })

  const operation = env.mock.getMostRecentOperation()

  // Fix relay-test-utils: remove void return from generate function (check https://github.com/DefinitelyTyped/DefinitelyTyped/pull/38831)
  // @ts-ignore
  env.mock.resolve(operation, MockPayloadGenerator.generate(operation))

  expect(onCompleted).toBeCalled()
  expect(onError).not.toBeCalled()
})
