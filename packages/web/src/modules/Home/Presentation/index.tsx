import React from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import { useStyles } from './styles'

const Presentation = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <img
        src="assets/img/bg-decoration.svg"
        alt="gradient shape from pink to blue"
        className={classes.bg}
      />
      <Container className={classes.container}>
        <Box className={classes.textBox}>
          <Typography variant="h3" className={classes.intro}>
            Relayable it&apos;s a place
            <br />
            to ask something and
            <br />
            give answers.
          </Typography>
          <a href="#ask-something">
            <Typography variant="h6" className={classes.callToAction}>
              Try ansking now.
            </Typography>
          </a>
          <Box className={classes.conversation}>
            <img
              src="assets/img/conversation.svg"
              alt="two people having a conversation"
              width={600}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Presentation
