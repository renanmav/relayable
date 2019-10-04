import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'

import { schema } from '../../../../schema'
import {
  getContext,
  createRows,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
} from '../../../../../test/helper'

beforeAll(connectMongoose)

beforeEach(clearDbAndRestartCounters)

afterAll(disconnectMongoose)

const gql = String.raw

const query = gql`
  mutation updateQuestion($id: ID!, $content: String, $tags: [String!]) {
    EditQuestion(input: { id: $id, content: $content, tags: $tags }) {
      error
      question {
        content
        tags
      }
    }
  }
`
const rootValue = {}

it('should edit question data if he/she is owner', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const context = getContext({ user })
  const variables = {
    id: toGlobalId('Question', question._id),
    content: 'What does the fox say again?',
    tags: ['fox', 'Old meme'],
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result).toMatchSnapshot()
})

it("should not edit question data if he/she isn't the owner", async () => {
  const userA = await createRows.createUser()
  const userB = await createRows.createUser()

  const question = await createRows.createQuestion({ author: userA._id })

  const context = getContext({ user: userB })

  const variables = {
    id: toGlobalId('Question', question._id),
    content: 'What does the fox say again?',
    tags: ['fox', 'Old meme'],
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result).toMatchSnapshot()
})
