import { graphql } from 'graphql'
import { fromGlobalId, toGlobalId } from 'graphql-relay'

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

describe('for the me query', () => {
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
})

const userQuery = `
  query M(
    $login: String!
  ) {
    user(login: $login) {
      github_id
    }
  }
`

describe('for the user query', () => {
  it('should retrieve github id if consulting its own info', async () => {
    const user = await createRows.createUser()

    const context = getContext({ user })
    const variables = {
      login: user.login
    }

    const result = await graphql(
      schema,
      userQuery,
      rootValue,
      context,
      variables
    )

    expect(result.data!.user.github_id).toBe(user.github_id)
  })

  it('should not retrieve github id if consulting other user info', async () => {
    const userA = await createRows.createUser()
    const userB = await createRows.createUser()

    const context = getContext({ user: userA })
    const variables = {
      login: userB.login
    }

    const result = await graphql(
      schema,
      userQuery,
      rootValue,
      context,
      variables
    )

    expect(result.data!.user.github_id).toBeNull()
  })

  it('should retrieve a user by its id', async () => {
    const user = await createRows.createUser()

    const query = `
      query fetchById(
        $id: String!
      ) {
        user(id: $id) {
          name
          avatar_url
        }
      }
    `

    const context = getContext()
    const variables = {
      id: toGlobalId('User', user._id)
    }

    const result = await graphql(schema, query, rootValue, context, variables)

    expect(result.data!.user.name).toBe(user.name)
    expect(result.data!.user.avatar_url).toBe(user.avatar_url)
  })

  it('should retrieve a user by its login', async () => {
    const user = await createRows.createUser()

    const query = `
      query fetchByLogin(
        $login: String!
      ) {
        user(login: $login) {
          name
          avatar_url
        }
      }
    `

    const context = getContext()
    const variables = {
      login: user.login
    }

    const result = await graphql(schema, query, rootValue, context, variables)

    expect(result.data!.user.name).toBe(user.name)
    expect(result.data!.user.avatar_url).toBe(user.avatar_url)
  })
})
