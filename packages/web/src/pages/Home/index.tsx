import React from 'react'
import { RouteComponentProps } from '@reach/router'

import Navbar from '@yotta/web/src/components/Navbar'

import AskHeadline from './AskHeadline'

const Home: React.FC<RouteComponentProps> = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Navbar />
    <AskHeadline />
  </React.Suspense>
)

export default Home
