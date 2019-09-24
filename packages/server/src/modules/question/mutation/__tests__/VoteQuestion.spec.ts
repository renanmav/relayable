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

  expect(result).toMatchSnapshot()
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
  expect(result).toMatchSnapshot()
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
    expect(result).toMatchSnapshot()

    const secondResult = await graphql(schema, query, rootValue, context, variables)
    expect(secondResult).toMatchSnapshot()
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
    const pubSub = new PubSub()
    const context = getContext({ user, pubSub })
    const variables = {
      id: toGlobalId('Question', question._id),
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
    const pubSub = new PubSub()
    const context = getContext({ user, pubSub })
    const variables = {
      id: toGlobalId('Question', question._id),
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
