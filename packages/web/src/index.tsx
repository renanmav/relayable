import React from 'react'
import ReactDOM from 'react-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

import './reset.css'

import { Environment } from '@relayable/web/src/relay'

import Main from './modules/Main'

ReactDOM.render(
  <RelayEnvironmentProvider environment={Environment}>
    <Main />
  </RelayEnvironmentProvider>,
  document.getElementById('app'),
)
