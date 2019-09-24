import React from 'react'
import { render } from 'react-dom'

import { ThemeProvider } from '@material-ui/styles'

import Routes from './routes'

import GlobalStyle, { lightTheme } from './styles'

render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={lightTheme}>
      <Routes />
    </ThemeProvider>
  </>,
  document.getElementById('app')
)
