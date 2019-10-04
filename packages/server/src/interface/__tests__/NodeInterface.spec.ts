/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { toGlobalId } from 'graphql-relay'
import { graphql } from 'graphql'

import {
  connectMongoose,
  disconnectMongoose,
  clearDbAndRestartCounters,
  createRows,
  getContext,
} from '../../../test/helper'
import { schema } from '../../schema'

beforeAll(connectMongoose)

beforeEach(clearDbAndRestartCounters)

afterAll(disconnectMongoose)

const gql = String.raw

it('should load User', async () => {
  const user = await createRows.createUser()

  const query = gql`
    query Q($id: ID!) {
      node(id: $id) {
        ... on User {
          github_id
          name
          login
          avatar_url
        }
      }
    }
  `

  const rootValue = {}
  const context = getContext()
  const variables = {
    id: toGlobalId('User', user._id),
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result).toMatchSnapshot()
})

it('should load Question', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id, tags: ['dummy'] })
  await createRows.createAnswer(question, { author: user._id })

  const query = gql`
    query Q($id: ID!) {
      node(id: $id) {
        ... on Question {
          content
          upvotes
          downvotes
          views
          anonymous_views
          total_views
          tags
          author {
            github_id
            name
            login
            avatar_url
          }
          answers {
            content
            upvotes
            downvotes
            is_accepted
            author {
              github_id
              name
              login
              avatar_url
            }
          }
        }
      }
    }
  `

  const rootValue = {}
  const context = getContext({ user })
  const variables = {
    id: toGlobalId('Question', question._id),
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result).toMatchSnapshot()
})
