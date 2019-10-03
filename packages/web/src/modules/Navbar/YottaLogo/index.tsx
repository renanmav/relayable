import React, { HTMLAttributes } from 'react'
import { Location } from '@reach/router'

import { useStyles } from './styles'

interface IProps {
  img: string
}

const YottaLogoComponent: React.ComponentType<IProps & HTMLAttributes<HTMLDivElement>> = props => {
  const classes = useStyles()

  const { className, img } = props

  return (
    <Location>
      {({ navigate }) => (
        <div className={className}>
          <img
            src={img}
            alt="Relayable logo"
            onClick={() => navigate('/')}
            className={classes.root}
          />
        </div>
      )}
    </Location>
  )
}

export default YottaLogoComponent
