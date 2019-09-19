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

const query = `
  mutation voteQuestion(
    $id: ID!
    $up: Boolean
    $down: Boolean
  ) {
    VoteQuestion(input: {
      id: $id
      up: $up
      down: $down
    }) {
      error
      question {
        upvotes
        downvotes
      }
    }
  }
`
const rootValue = {}

it('should not vote if logged off', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const context = getContext()
  const variables = {
    id: toGlobalId('Question', question._id),
    up: true,
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result.data!.VoteQuestion.error).toBeTruthy()
})

it('should remove his vote', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const pubSub = new PubSub()
  const context = getContext({ user, pubSub })
  const variables = {
    id: toGlobalId('Question', question._id),
  }

  await graphql(schema, query, rootValue, context, { ...variables, up: true })

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result.data!.VoteQuestion.question.upvotes).toBe(0)
  expect(result.data!.VoteQuestion.question.downvotes).toBe(0)
})

describe('when votting up', () => {
  it('should vote only once', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })
    const pubSub = new PubSub()
    const context = getContext({ user, pubSub })
    const variables = {
      id: toGlobalId('Question', question._id),
      up: true,
    }

    const result = await graphql(schema, query, rootValue, context, variables)
    expect(result.data!.VoteQuestion.question.upvotes).toBe(1)

    const secondResult = await graphql(
      schema,
      query,
      rootValue,
      context,
      variables
    )
    expect(secondResult.data!.VoteQuestion.error).toBeTruthy()
  })

  it('should remove down vote if so', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })
    const pubSub = new PubSub()
    const context = getContext({ user, pubSub })
    const variables = {
      id: toGlobalId('Question', question._id),
    }

    const result = await graphql(schema, query, rootValue, context, {
      ...variables,
      down: true,
    })
    expect(result.data!.VoteQuestion.question.upvotes).toBe(0)
    expect(result.data!.VoteQuestion.question.downvotes).toBe(1)

    const secondResult = await graphql(schema, query, rootValue, context, {
      ...variables,
      up: true,
    })
    expect(secondResult.data!.VoteQuestion.question.upvotes).toBe(1)
    expect(secondResult.data!.VoteQuestion.question.downvotes).toBe(0)
  })
})

describe('when votting down', () => {
  it('should vote only once', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })
    const pubSub = new PubSub()
    const context = getContext({ user, pubSub })
    const variables = {
      id: toGlobalId('Question', question._id),
      down: true,
    }

    const result = await graphql(schema, query, rootValue, context, variables)
    expect(result.data!.VoteQuestion.question.downvotes).toBe(1)

    const secondResult = await graphql(
      schema,
      query,
      rootValue,
      context,
      variables
    )
    expect(secondResult.data!.VoteQuestion.error).toBeTruthy()
  })

  it('should remove up vote if so', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })
    const pubSub = new PubSub()
    const context = getContext({ user, pubSub })
    const variables = {
      id: toGlobalId('Question', question._id),
    }

    const result = await graphql(schema, query, rootValue, context, {
      ...variables,
      up: true,
    })
    expect(result.data!.VoteQuestion.question.upvotes).toBe(1)
    expect(result.data!.VoteQuestion.question.downvotes).toBe(0)

    const secondResult = await graphql(schema, query, rootValue, context, {
      ...variables,
      down: true,
    })
    expect(secondResult.data!.VoteQuestion.question.upvotes).toBe(0)
    expect(secondResult.data!.VoteQuestion.question.downvotes).toBe(1)
  })
})
