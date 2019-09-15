import {
  getContext,
  createRows,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose
} from '../../../../../test/helper'
import { graphql } from 'graphql'
import { schema } from '../../../../schema'
import { toGlobalId } from 'graphql-relay'
import { PubSub } from 'graphql-subscriptions'

beforeAll(connectMongoose)

beforeEach(clearDbAndRestartCounters)

afterAll(disconnectMongoose)

const query = `
  mutation viewQuestion(
    $id: ID!
  ) {
    ViewQuestion(input: {
      id: $id
    }) {
      error
      question {
        views
      }
    }
  }
`
const rootValue = {}

it('should view when logged in', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const pubSub = new PubSub()
  const context = getContext({ user, pubSub })
  const variables = {
    id: toGlobalId('Question', question._id)
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result.data!.ViewQuestion.question.views).toBe(1)
})

it('should not view when logged off', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const context = getContext()
  const variables = {
    id: toGlobalId('Question', question._id)
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result.data!.ViewQuestion.error).toBeTruthy()
})

it('should view only once', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const context = getContext({ user })
  const variables = {
    id: toGlobalId('Question', question._id)
  }

  await graphql(schema, query, rootValue, context, variables)
  const response = await graphql(schema, query, rootValue, context, variables)

  expect(response.data!.ViewQuestion.error).toBeTruthy()
})
