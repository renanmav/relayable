import React, { HTMLAttributes } from 'react'
import { Location } from '@reach/router'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { padding: `${theme.spacing(2)}px 0px`, cursor: 'pointer' },
  })
)
