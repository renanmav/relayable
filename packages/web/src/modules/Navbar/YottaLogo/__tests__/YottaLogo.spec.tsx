import React from 'react'
import renderer from 'react-test-renderer'

import YottaLogoComponent from '../../YottaLogo'

it('render correctly', () => {
  const component = renderer.create(<YottaLogoComponent />)

  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
