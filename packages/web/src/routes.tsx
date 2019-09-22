import React from 'react'
import { Router } from '@reach/router'
import Home from '@yotta/web/src/pages/Home'

export default () => (
  <Router className='router-container'>
    <Home path='/' />
  </Router>
)
