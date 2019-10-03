import React from 'react'
import { Router } from '@reach/router'

import Home from './modules/Home'
import Auth from './modules/Auth'
import Navbar from './modules/Navbar'
import Footer from './modules/Footer'

const Routes = () => (
  <React.Suspense fallback={<div>Loading</div>}>
    <Navbar />
    <Router className="router-container">
      <Home path="/" />
      <Auth path="auth/github" />
    </Router>
    <Footer />
  </React.Suspense>
)

export default Routes
