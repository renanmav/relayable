import React from 'react'
// @ts-ignore
import { useQuery } from '@entria/relay-experimental'
import { graphql } from 'react-relay'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { useStyles } from './styles'

import { AskHeadlineQuery } from './__generated__/AskHeadlineQuery.graphql'

export default function AskHeadline() {
  const { questionAvgResponse } = useQuery<AskHeadlineQuery>(
    graphql`
      query AskHeadlineQuery {
        questionAvgResponse
      }
    `
  )

  const classes = useStyles()

  return (
    <Box className={classes.box}>
      <Typography className={classes.title}>What do you want to know?</Typography>
      <Typography className={classes.subtitle}>
        {`Every question is answered in ${questionAvgResponse}`}
      </Typography>
    </Box>
  )
}
