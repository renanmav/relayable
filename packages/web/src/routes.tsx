import React from 'react'
import { Router } from '@reach/router'

import Home from './pages/Home'

const Routes = () => (
  <Router>
    <Home path="/" />
  </Router>
)

export default Routes
