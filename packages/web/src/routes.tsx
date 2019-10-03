import React from 'react'
import { Router } from '@reach/router'

import Home from './modules/Home'
import Auth from './modules/Auth'

const Routes = () => (
  <React.Suspense fallback={<div>Loading</div>}>
    <Router className="router-container">
      <Home path="/" />
      <Auth path="/auth/github" />
    </Router>
  </React.Suspense>
)

export default Routes
