import React from 'react'
import { Router } from '@reach/router'

import Home from './pages/Home'
import Auth from './pages/Auth'

const Routes = () => (
  <Router className='router-container'>
    <Home path='/' />
    <Auth path='auth/github' />
  </Router>
)

export default Routes
