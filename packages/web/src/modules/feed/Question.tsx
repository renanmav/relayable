import React from 'react'
import { useFragment, graphql } from 'react-relay/hooks'
import moment from 'moment'

import { Avatar, Typography, Box, Paper, Container } from '@material-ui/core'

import { QuestionFragment$key } from './__generated__/QuestionFragment.graphql'

interface Props {
  question: QuestionFragment$key
}

const Question = (props: Props) => {
  const { author, createdAt, views, content } = useFragment(
    graphql`
      fragment QuestionFragment on Question {
        id
        content
        views
        author {
          name
          avatar_url
        }
        createdAt
      }
    `,
    props.question,
  )

  return (
    <Paper style={{ marginBottom: 20 }}>
      <Container style={{ padding: 20 }}>
        <Box id="header" style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <Avatar alt={author!.name!} src={author!.avatar_url!} />
          <Box id="question-info" style={{ flexGrow: 1, marginLeft: 10 }}>
            <Typography>{author!.name!}</Typography>
            <Typography variant="caption">{moment(createdAt!).fromNow()}</Typography>
          </Box>
          <Typography>{`${views} views`}</Typography>
        </Box>
        <Typography style={{ marginLeft: 50 }}>{content}</Typography>
      </Container>
    </Paper>
  )
}

export default Question
