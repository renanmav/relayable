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
import AnswerModel from '../../AnswerModel'

beforeAll(connectMongoose)

beforeEach(clearDbAndRestartCounters)

afterAll(disconnectMongoose)

const gql = String.raw

const query = gql`
  mutation acceptAnswer($id: ID!) {
    AcceptAnswer(input: { id: $id }) {
      error
      answer {
        is_accepted
      }
    }
  }
`
const rootValue = {}

it("should not accept the answer if isn't question owner", async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })

  const otherUser = await createRows.createUser()
  const answer = await createRows.createAnswer(question, {
    author: otherUser._id,
  })

  const context = getContext({ user: otherUser })
  const variables = {
    id: toGlobalId('Answer', answer._id),
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result).toMatchSnapshot()
})

it('should accept only one answer', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })

  const answerUser = await createRows.createUser()
  const answer = await createRows.createAnswer(question, {
    author: answerUser._id,
    is_accepted: true,
  })
  const acceptedAnswer = await createRows.createAnswer(question, {
    author: answerUser._id,
  })

  const context = getContext({ user })
  const variables = {
    id: toGlobalId('Answer', acceptedAnswer._id),
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  const _answer = await AnswerModel.findById(answer._id)

  expect(result).toMatchSnapshot()
  expect(_answer!.is_accepted).toBe(false)
})
