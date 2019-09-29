import React from 'react'
import { render } from 'react-dom'

// @ts-ignore
import { RelayEnvironmentProvider } from '@entria/relay-experimental'
import { Environment } from '@yotta/web/src/relay'

import CssBaseline from '@material-ui/core/CssBaseline'

import Main from './pages/Main'

render(
  <RelayEnvironmentProvider environment={Environment}>
    <Main />
    <CssBaseline />
  </RelayEnvironmentProvider>,
  document.getElementById('app')
)
