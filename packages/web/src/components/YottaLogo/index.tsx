import React, { HTMLAttributes } from 'react'
import { Location } from '@reach/router'

import { YottaLogo } from './styles'

interface IProps {
  img: string
}

const YottaLogoComponent: React.ComponentType<IProps & HTMLAttributes<HTMLDivElement>> = props => (
  <Location>
    {({ navigate }) => (
      <div className={props.className}>
        <YottaLogo src={props.img} onClick={() => navigate('/')} />
      </div>
    )}
  </Location>
)

export default YottaLogoComponent
