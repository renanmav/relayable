import React from 'react'
import { render } from '@testing-library/react'
import { env } from '@relayable/web/src/relay/createQueryRendererModern'

import { RelayEnvironmentProvider } from '@entria/relay-experimental'

import { MockPayloadGenerator } from 'relay-test-utils'

import Ask from '../AskHeadline'

const delay = (value: any) => new Promise(resolve => setTimeout(() => resolve(), value))

const Providers: React.FC = ({ children }) => (
  <RelayEnvironmentProvider environment={env}>
    <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
  </RelayEnvironmentProvider>
)

test('Loading state', () => {
  const { queryByText } = render(
    <Providers>
      <Ask />
    </Providers>
  )

  expect(queryByText('Loading...')).toBeDefined()
})

test('Data loaded', async () => {
  const { queryByText } = render(
    <Providers>
      <Ask />
    </Providers>
  )

  env.mock.resolveMostRecentOperation(operation => MockPayloadGenerator.generate(operation))

  await delay(1000)

  expect(queryByText('Loading...')).toBeNull()
})
