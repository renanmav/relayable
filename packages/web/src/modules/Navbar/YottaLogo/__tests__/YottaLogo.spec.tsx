import React from 'react'
import { render } from '@testing-library/react'

import YottaLogoComponent from '../../YottaLogo'

it('render correctly', () => {
  const component = render(<YottaLogoComponent />)

  expect(component.container).toMatchSnapshot()
})
