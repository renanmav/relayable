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

const query = `
  mutation voteAnswer(
    $id: ID!
    $up: Boolean
    $down: Boolean
  ) {
    VoteAnswer(input: {
      id: $id
      up: $up
      down: $down
    }) {
      error
      answer {
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
  const answer = await createRows.createAnswer(question, { author: user._id })
  const context = getContext()
  const variables = {
    id: toGlobalId('Answer', answer._id),
    up: true,
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result.data!.VoteAnswer.error).toBeTruthy()
})

it('should remove his vote', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const answer = await createRows.createAnswer(question, { author: user._id })

  const context = getContext({ user })
  const variables = {
    id: toGlobalId('Answer', answer._id),
  }

  await graphql(schema, query, rootValue, context, { ...variables, up: true })

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result.data!.VoteAnswer.answer.upvotes).toBe(0)
  expect(result.data!.VoteAnswer.answer.downvotes).toBe(0)
})

describe('when votting up', () => {
  it('should vote only once', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })
    const answer = await createRows.createAnswer(question, { author: user._id })
    const context = getContext({ user })
    const variables = {
      id: toGlobalId('Answer', answer._id),
      up: true,
    }

    const result = await graphql(schema, query, rootValue, context, variables)
    expect(result.data!.VoteAnswer.answer.upvotes).toBe(1)

    const secondResult = await graphql(
      schema,
      query,
      rootValue,
      context,
      variables
    )
    expect(secondResult.data!.VoteAnswer.error).toBeTruthy()
  })

  it('should remove down vote if so', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })
    const answer = await createRows.createAnswer(question, { author: user._id })
    const context = getContext({ user })
    const variables = {
      id: toGlobalId('Answer', answer._id),
    }

    const result = await graphql(schema, query, rootValue, context, {
      ...variables,
      down: true,
    })
    expect(result.data!.VoteAnswer.answer.upvotes).toBe(0)
    expect(result.data!.VoteAnswer.answer.downvotes).toBe(1)

    const secondResult = await graphql(schema, query, rootValue, context, {
      ...variables,
      up: true,
    })
    expect(secondResult.data!.VoteAnswer.answer.upvotes).toBe(1)
    expect(secondResult.data!.VoteAnswer.answer.downvotes).toBe(0)
  })
})

describe('when votting down', () => {
  it('should vote only once', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })
    const answer = await createRows.createAnswer(question, { author: user._id })
    const context = getContext({ user })
    const variables = {
      id: toGlobalId('Answer', answer._id),
      down: true,
    }

    const result = await graphql(schema, query, rootValue, context, variables)
    expect(result.data!.VoteAnswer.answer.downvotes).toBe(1)

    const secondResult = await graphql(
      schema,
      query,
      rootValue,
      context,
      variables
    )
    expect(secondResult.data!.VoteAnswer.error).toBeTruthy()
  })

  it('should remove up vote if so', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })
    const answer = await createRows.createAnswer(question, { author: user._id })
    const context = getContext({ user })
    const variables = {
      id: toGlobalId('Answer', answer._id),
    }

    const result = await graphql(schema, query, rootValue, context, {
      ...variables,
      up: true,
    })
    expect(result.data!.VoteAnswer.answer.upvotes).toBe(1)
    expect(result.data!.VoteAnswer.answer.downvotes).toBe(0)

    const secondResult = await graphql(schema, query, rootValue, context, {
      ...variables,
      down: true,
    })
    expect(secondResult.data!.VoteAnswer.answer.upvotes).toBe(0)
    expect(secondResult.data!.VoteAnswer.answer.downvotes).toBe(1)
  })
})
