import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useLazyLoadQuery, graphql } from 'react-relay/hooks'

import { Container, Typography } from '@material-ui/core'

import Navbar from '../Navbar'

import Question from './Question'

import { FeedQuery } from './__generated__/FeedQuery.graphql'

const Feed: React.FC<RouteComponentProps> = () => {
  const { questions } = useLazyLoadQuery<FeedQuery>(
    graphql`
      query FeedQuery {
        questions {
          edges {
            node {
              id
              ...QuestionFragment
            }
          }
        }
      }
    `,
    {},
  )

  const { edges } = questions!

  return (
    <>
      <Navbar />
      <Container style={{ maxWidth: 1000 }}>
        <Typography variant="h4" style={{ padding: '20px 0' }}>
          Feed page
        </Typography>
        {edges && edges.map(edge => <Question key={edge!.node!.id} question={edge!.node!} />)}
      </Container>
    </>
  )
}

export default Feed
