import React from 'react'
import { RouteComponentProps } from '@reach/router'

import Navbar from '@yotta/web/src/modules/Navbar'

import Presentation from './Presentation'
import AskHeadline from './AskHeadline'
import AskBox from './AskBox'

const Home: React.FC<RouteComponentProps> = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Navbar />
    <Presentation />
    <AskHeadline />
    <AskBox />
  </React.Suspense>
)

export default Home
