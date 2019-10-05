import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import YottaLogoComponent from './YottaLogo'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 60,
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: { position: 'absolute', marginTop: 160 },
    content: { display: 'flex', alignItems: 'center' },
    site: { marginLeft: 10, fontWeight: 'bold', color: theme.palette.grey[700] },
    caption: { fontWeight: 'lighter', color: theme.palette.grey[700] },
    bg: { width: '100%' },
  })
)

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
