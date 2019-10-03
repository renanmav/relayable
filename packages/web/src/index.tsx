import React from 'react'
import { render } from 'react-dom'

// @ts-ignore
import { RelayEnvironmentProvider } from '@entria/relay-experimental'
import { Environment } from '@yotta/web/src/relay'

import Main from './modules/Main'

render(
  <RelayEnvironmentProvider environment={Environment}>
    <Main />
  </RelayEnvironmentProvider>,
  document.getElementById('app')
)
