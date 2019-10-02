import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { PubSub } from 'graphql-subscriptions'

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
  mutation viewQuestion($id: ID!) {
    ViewQuestion(input: { id: $id }) {
      error
      question {
        views
        anonymous_views
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
    id: toGlobalId('Question', question._id),
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result).toMatchSnapshot()
})

it('should increment anonymous views when logged off', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const pubSub = new PubSub()
  const context = getContext({ pubSub })
  const variables = {
    id: toGlobalId('Question', question._id),
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result).toMatchSnapshot()
})

it('should view only once', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const context = getContext({ user })
  const variables = {
    id: toGlobalId('Question', question._id),
  }

  await graphql(schema, query, rootValue, context, variables)
  const response = await graphql(schema, query, rootValue, context, variables)

  expect(response).toMatchSnapshot()
})
