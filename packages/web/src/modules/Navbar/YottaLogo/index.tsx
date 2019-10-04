import React, { HTMLAttributes } from 'react'
import { Location } from '@reach/router'

import { useStyles } from './styles'

interface IProps {
  img: string
}

const YottaLogoComponent: React.ComponentType<HTMLAttributes<HTMLDivElement>> = props => {
  const classes = useStyles()

  const { className } = props

  return (
    <Location>
      {({ navigate }) => (
        <div className={className}>
          <img
            src="assets/img/yotta-logo.svg"
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
