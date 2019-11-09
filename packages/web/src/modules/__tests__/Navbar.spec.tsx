import React from 'react'
import { render } from '@testing-library/react'
import { MockPayloadGenerator } from 'relay-test-utils'
import { env } from '@relayable/web/src/relay/createQueryRendererModern'

import Navbar from '../Navbar'

test('Loading state', () => {
  const component = render(<Navbar />)

  expect(component.container).toMatchSnapshot()
})

test('Data render', () => {
  const component = render(<Navbar />)

  env.mock.resolveMostRecentOperation(operation => MockPayloadGenerator.generate(operation))

  expect(component.container).toMatchSnapshot()
})

test('Error state', () => {
  const component = render(<Navbar />)

  env.mock.rejectMostRecentOperation(new Error())

  expect(component.container).toMatchSnapshot()
})
