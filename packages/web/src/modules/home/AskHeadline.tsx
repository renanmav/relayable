import React from 'react'
import { useQuery } from '@entria/relay-experimental'
import { graphql } from 'react-relay'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: `${theme.spacing(6)}px 0`,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      marginBottom: 30,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 23,
      textAlign: 'center',
      fontWeight: 300,
      color: theme.palette.grey[600],
    },
  })
)
