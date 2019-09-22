import React from 'react'
import { render } from 'react-dom'

import Routes from './routes'
import GlobalStyle from './styles'

render(
  <>
    <GlobalStyle />
    <Routes />
  </>,
  document.getElementById('app')
)
