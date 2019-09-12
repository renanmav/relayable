import { graphql } from 'graphql'

import { schema } from '../../schema'
import {
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  getContext,
  createRows
} from '../../../test/helper'

beforeAll(connectMongoose)

beforeEach(clearDbAndRestartCounters)

afterAll(disconnectMongoose)

const meQuery = `
  query {
    me {
      name
      avatar_url
    }
  }
`
const rootValue = {}

it('should retrieve the logged user when logged in', async () => {
  const user = await createRows.createUser()

  const context = getContext({ user })

  const result = await graphql(schema, meQuery, rootValue, context)

  expect(result.data!.me.name).toBe(user.name)
  expect(result.data!.me.avatar_url).toBe(user.avatar_url)
})

it('should not retrieve the logged user when logged out', async () => {
  const context = getContext()

  const result = await graphql(schema, meQuery, rootValue, context)

  expect(result.data!.me).toBeNull()
})
