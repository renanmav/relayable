import React from 'react'
import { render } from 'react-dom'

// @ts-ignore
import { RelayEnvironmentProvider } from '@entria/relay-experimental'

import CssBaseline from '@material-ui/core/CssBaseline'

import Main from './pages/Main'
import { Environment } from './relay'

render(
  <RelayEnvironmentProvider environment={Environment}>
    <Main />
    <CssBaseline />
  </RelayEnvironmentProvider>,
  document.getElementById('app')
)
