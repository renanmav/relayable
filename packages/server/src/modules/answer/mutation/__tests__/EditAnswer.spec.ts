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
  mutation updateAnswer(
    $id: ID!
    $content: String!
  ) {
    EditAnswer(input: {
      id: $id
      content: $content
    }) {
      error
      answer {
        id
        content
      }
    }
  }
`
const rootValue = {}

it('should edit answer data if he/she is owner', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const answer = await createRows.createAnswer(question, { author: user._id })
  const context = getContext({ user })

  const variables = {
    id: toGlobalId('Answer', answer._id),
    content: "Some answer that I've typed wrong",
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result.data!.EditAnswer.answer.id).toBe(variables.id)
  expect(result.data!.EditAnswer.answer.content).toBe(variables.content)
})

it("should not edit question data if he/she isn't the owner", async () => {
  const userA = await createRows.createUser()
  const userB = await createRows.createUser()
  const question = await createRows.createQuestion({ author: userA._id })
  const answer = await createRows.createAnswer(question, { author: userB._id })

  const context = getContext({ user: userA })

  const variables = {
    id: toGlobalId('Answer', answer._id),
    content: 'Trying to edit some answer that its not mine',
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result.data!.EditAnswer.error).toBeTruthy()
  expect(result.data!.EditAnswer.answer).toBeFalsy()
})
