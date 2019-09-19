import { toGlobalId } from 'graphql-relay'
import { graphql } from 'graphql'

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
  mutation deleteQuestion(
    $id: ID!
  ) {
    DeleteQuestion(input: {
      id: $id
    }) {
      error
    }
  }
`
const rootValue = {}

it('should delete question if he/she is owner', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const context = getContext({ user })
  const variables = {
    id: toGlobalId('Question', question._id),
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result.data!.DeleteQuestion.error).toBeNull()
})

it("should not delete question if he/she isn't the owner", async () => {
  const userA = await createRows.createUser()
  const userB = await createRows.createUser()

  const question = await createRows.createQuestion({ author: userA._id })

  const context = getContext({ user: userB })

  const variables = {
    id: toGlobalId('Question', question._id),
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result.data!.DeleteQuestion.error).toBeTruthy()
})
