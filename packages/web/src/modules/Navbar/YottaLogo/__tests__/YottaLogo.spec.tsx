import React from 'react'
import renderer from 'react-test-renderer'

import YottaLogoComponent from '../../YottaLogo'

it('render correctly', () => {
  const component = renderer.create(
    <YottaLogoComponent img="https://avatars1.githubusercontent.com/u/42983909?s=400&u=561412bd388c64118b8c0b2a99692853e5197e6e&v=4" />
  )

  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
