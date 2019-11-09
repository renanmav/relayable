import React from 'react'
import { render } from 'react-dom'

import './reset.css'

import { RelayEnvironmentProvider } from '@entria/relay-experimental'

import { Environment } from '@relayable/web/src/relay'

import Main from './modules/Main'

render(
  <RelayEnvironmentProvider environment={Environment}>
    <Main />
  </RelayEnvironmentProvider>,
  document.getElementById('app')
)
