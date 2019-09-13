import {
  getContext,
  createRows,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose
} from '../../../../../test/helper'
import { graphql } from 'graphql'
import { schema } from '../../../../schema'
import { PubSub } from 'graphql-subscriptions'

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
        id
        title
        content
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
    content: 'What does the fox say?'
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result.data!.CreateQuestion.question.title).toBe(variables.title)
  expect(result.data!.CreateQuestion.question.content).toBe(variables.content)
})

it('should not create a question when unauthenticated', async () => {
  const context = getContext()
  const variables = {
    title: 'Test',
    content: 'Some question'
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result.data!.CreateQuestion.error).toBeTruthy()
  expect(result.data!.CreateQuestion.question).toBeFalsy()
})
