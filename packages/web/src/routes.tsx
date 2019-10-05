import React from 'react'
import { Router } from '@reach/router'

import Home from './modules/home/Home'
import AuthGithub from './modules/auth/Github'
import Feed from './modules/feed/Feed'

const Routes = () => (
  <React.Suspense fallback={<div>Loading</div>}>
    <Router className="router-container">
      <Home path="/" />
      <AuthGithub path="/auth/github" />
      <Feed path="/feed" />
    </Router>
  </React.Suspense>
)

export default Routes
