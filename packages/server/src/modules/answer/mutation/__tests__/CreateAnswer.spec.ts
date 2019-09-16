import {
  getContext,
  createRows,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose
} from '../../../../../test/helper'
import { graphql } from 'graphql'
import { schema } from '../../../../schema'
import { toGlobalId } from 'graphql-relay'

beforeAll(connectMongoose)

beforeEach(clearDbAndRestartCounters)

afterAll(disconnectMongoose)

const query = `
  mutation createAnswer(
    $question: ID!
    $content: String!
  ) {
    CreateAnswer(input: {
      question: $question
      content: $content
    }) {
      error
      answer {
        content
        question {
          id
          title
        }
        author {
          name
        }
      }
    }
  }
`
const rootValue = {}

it('should answer a question if exists', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const context = getContext({ user })
  const variables = {
    question: toGlobalId('Question', question._id),
    content: '42'
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result.data!.CreateAnswer.answer.content).toBe(variables.content)
  expect(result.data!.CreateAnswer.answer.question.id).toBe(variables.question)
  expect(result.data!.CreateAnswer.answer.question.title).toBe(question.title)
  expect(result.data!.CreateAnswer.answer.author.name).toBe(user.name)
})
