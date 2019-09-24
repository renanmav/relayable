import { PubSub } from 'graphql-subscriptions'
import { graphql } from 'graphql'

import {
  getContext,
  createRows,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
} from '../../../../../test/helper'
import { schema } from '../../../../schema'

beforeAll(connectMongoose)

beforeEach(clearDbAndRestartCounters)

afterAll(disconnectMongoose)

const query = `
  mutation createQuestion(
    $title: String!
    $content: String!
  ) {
    CreateQuestion(input: {
      title: $title
      content: $content
    }) {
      error
      question {
        title
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

it('should create a question when authenticated', async () => {
  const user = await createRows.createUser()
  const pubSub = new PubSub()
  const context = getContext({ user, pubSub })
  const variables = {
    title: 'A question',
    content: 'What does the fox say?',
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result).toMatchSnapshot()
})

it('should not create a question when unauthenticated', async () => {
  const context = getContext()
  const variables = {
    title: 'Test',
    content: 'Some question',
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result).toMatchSnapshot()
})
