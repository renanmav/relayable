import React from 'react'
import { RouteComponentProps } from '@reach/router'

import Presentation from './Presentation'
import AskHeadline from './AskHeadline'
import AskBox from './AskBox'

const Home: React.FC<RouteComponentProps> = () => (
  <>
    <Presentation />
    <AskHeadline />
    <AskBox />
  </>
)

export default Home
