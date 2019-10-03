import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import YottaLogoComponent from '../Navbar/YottaLogo'

import { useStyles } from './styles'

const Footer = () => {
  const classes = useStyles()

  return (
    <>
      <Container className={classes.root}>
        <Box className={classes.wrapper}>
          <Box className={classes.content}>
            <YottaLogoComponent />
            <Typography className={classes.site}>relayable.dev</Typography>
          </Box>
          <Typography variant="caption" className={classes.caption}>
            2019 Yotta. All rights reserved.
          </Typography>
        </Box>
      </Container>
      <img src="assets/img/bg-footer.svg" style={{ width: '100%' }} />
    </>
  )
}

export default Footer
