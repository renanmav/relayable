import React from 'react'
import { render } from 'react-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import Main from './pages/Main'

render(
  <>
    <Main />
    <CssBaseline />
  </>,
  document.getElementById('app')
)
