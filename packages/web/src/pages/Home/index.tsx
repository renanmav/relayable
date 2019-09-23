import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Navbar from '@yotta/web/src/components/Navbar'

import { GradientBackdrop } from './styles'

const Home: React.FC<RouteComponentProps> = () => {
  const GradientBackdropRef = React.createRef<HTMLImageElement>()

  return (
    <>
      <Navbar />
      <GradientBackdrop
        ref={GradientBackdropRef}
        src={require('@yotta/web/assets/img/bg-decoration.svg')}
      />
    </>
  )
}

export default Home
