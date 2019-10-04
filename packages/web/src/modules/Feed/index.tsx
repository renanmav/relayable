import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useQuery } from '@entria/relay-experimental'
import { graphql } from 'react-relay'

import { Container, Typography } from '@material-ui/core'

import Navbar from '../Navbar'

import { FeedQuery } from './__generated__/FeedQuery.graphql'
import Question from './Question'
import { QuestionFragment } from './Question/__generated__/QuestionFragment.graphql'

const Feed: React.FC<RouteComponentProps> = () => {
  const { questions } = useQuery<FeedQuery>(
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
    `
  )

  const { edges } = questions!

  return (
    <>
      <Navbar />
      <Container style={{ maxWidth: 1000 }}>
        <Typography variant="h4" style={{ padding: '20px 0' }}>
          Feed page
        </Typography>
        {edges &&
          edges.map(edge => (
            <Question key={edge!.node!.id} question={(edge!.node as unknown) as QuestionFragment} />
          ))}
      </Container>
    </>
  )
}

export default Feed
