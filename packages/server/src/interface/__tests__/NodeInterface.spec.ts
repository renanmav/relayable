/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { toGlobalId } from 'graphql-relay'
import { graphql } from 'graphql'
import {
  connectMongoose,
  disconnectMongoose,
  clearDbAndRestartCounters,
  createRows,
  getContext
} from '../../../test/helper'
import { schema } from '../../schema'

beforeAll(connectMongoose)

beforeEach(clearDbAndRestartCounters)

afterAll(disconnectMongoose)

it('should load User', async () => {
  const user = await createRows.createUser()

  const query = `
    query Q($id: ID!) {
      node(id: $id) {
        id
        ... on User {
          name
        }
      }
    }
  `

  const rootValue = {}
  const context = getContext()
  const variables = {
    id: toGlobalId('User', user._id)
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result.data!.node.id).toBe(variables.id)
  expect(result.data!.node.name).toBe(user.name)
})
