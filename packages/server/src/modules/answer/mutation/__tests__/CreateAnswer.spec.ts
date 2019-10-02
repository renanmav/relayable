import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'

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

const gql = String.raw

const query = gql`
  mutation createAnswer($question: ID!, $content: String!) {
    CreateAnswer(input: { question: $question, content: $content }) {
      error
      answer {
        content
        question {
          content
        }
        author {
          name
        }
      }
    }
  }
`
const rootValue = {}

it('should answer a question if exists', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const context = getContext({ user })
  const variables = {
    question: toGlobalId('Question', question._id),
    content: '42',
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result).toMatchSnapshot()
})
