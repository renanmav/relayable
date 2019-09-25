import React from 'react'
import renderer from 'react-test-renderer'
// @ts-ignore
import { MockPayloadGenerator } from 'relay-test-utils'
import { env } from '@yotta/web/src/relay/createQueryRendererModern'

import Navbar from '../index'

test('Loading state', () => {
  const component = renderer.create(<Navbar />)

  expect(component).toMatchSnapshot()
})

test('Data render', () => {
  const component = renderer.create(<Navbar />)

  env.mock.resolveMostRecentOperation((operation: any) => MockPayloadGenerator.generate(operation))

  expect(component).toMatchSnapshot()
})

test('Error state', () => {
  const component = renderer.create(<Navbar />)

  env.mock.rejectMostRecentOperation(new Error())

  expect(component).toMatchSnapshot()
})
