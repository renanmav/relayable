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
  mutation voteAnswer($id: ID!, $up: Boolean, $down: Boolean) {
    VoteAnswer(input: { id: $id, up: $up, down: $down }) {
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

  expect(result).toMatchSnapshot()
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
  expect(result).toMatchSnapshot()
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
    expect(result).toMatchSnapshot()

    const secondResult = await graphql(schema, query, rootValue, context, variables)
    expect(secondResult).toMatchSnapshot()
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
    expect(result).toMatchSnapshot()

    const secondResult = await graphql(schema, query, rootValue, context, {
      ...variables,
      up: true,
    })
    expect(secondResult).toMatchSnapshot()
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
    expect(result).toMatchSnapshot()

    const secondResult = await graphql(schema, query, rootValue, context, variables)
    expect(secondResult).toMatchSnapshot()
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
    expect(result).toMatchSnapshot()

    const secondResult = await graphql(schema, query, rootValue, context, {
      ...variables,
      down: true,
    })
    expect(secondResult).toMatchSnapshot()
  })
})
