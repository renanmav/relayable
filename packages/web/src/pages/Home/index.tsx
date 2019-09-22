import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import Navbar from '@yotta/web/src/components/Navbar'

import {
  MainContent,
  HeadlineText,
  VectorGraphic,
  GradientBackdrop
} from './styles'

const Home: React.FC<RouteComponentProps> = () => {
  const VectorBackdropRef = React.createRef<HTMLImageElement>()
  const GradientBackdropRef = React.createRef<HTMLImageElement>()

  return (
    <>
      <Navbar />
      <MainContent>
        <HeadlineText>
          Relayable is a place to
          <br />
          ask something
          <br />
          and give answers
        </HeadlineText>
        <VectorGraphic
          ref={VectorBackdropRef}
          src={require('@yotta/web/assets/img/qa-backdrop.png')}
        />
        <GradientBackdrop
          ref={GradientBackdropRef}
          src={require('@yotta/web/assets/img/bg-gradient.png')}
        />
      </MainContent>
    </>
  )
}

export default Home
