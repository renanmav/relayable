import React from 'react'
import { Router } from '@reach/router'

import Home from './modules/Home'
import Auth from './modules/Auth'

const Routes = () => (
  <Router className="router-container">
    <Home path="/" />
    <Auth path="auth/github" />
  </Router>
)

export default Routes
