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

const query = `
  query {
    questions {
      edges {
        node {
          title
          author {
            name
          }
        }
      }
    }
  }
`

const rootValue = {}

describe('when authenticated', () => {
  it('should retrieve the Question connection and its data', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })

    const context = getContext({ user })

    const result = await graphql(schema, query, rootValue, context)

    expect(result.data!.questions.edges[0].node.title).toBe(question.title)
    expect(result.data!.questions.edges[0].node.author.name).toBe(user.name)
  })
})

describe('when unauthenticated', () => {
  it('should not retrieve the Question connection', async () => {
    const context = getContext()

    const result = await graphql(schema, query, rootValue, context)

    expect(result.errors!).toBeTruthy()
    expect(result.data!.questions).toBeFalsy()
  })
})
