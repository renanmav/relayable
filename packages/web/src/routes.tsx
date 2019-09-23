import React from 'react'
import { Router } from '@reach/router'
import Home from '@yotta/web/src/pages/Home'

const Routes = () => (
  <Router className='router-container'>
    <Home path='/' />
  </Router>
)

export default Routes
