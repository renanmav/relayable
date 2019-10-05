import React from 'react'
import { RouteComponentProps } from '@reach/router'

import Navbar from '../Navbar'
import Footer from '../Footer'

import Presentation from './Presentation'
import AskHeadline from './AskHeadline'
import AskBox from './AskBox'

const Home: React.FC<RouteComponentProps> = () => (
  <>
    <Navbar />
    <Presentation />
    <AskHeadline />
    <AskBox />
    <Footer />
  </>
)

export default Home
