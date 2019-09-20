import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import slugify from 'slugify'

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
  mutation updateQuestion(
    $id: ID!
    $title: String
    $content: String
    $tags: [String!]
  ) {
    EditQuestion(input: {
      id: $id
      title: $title
      content: $content
      tags: $tags
    }) {
      error
      question {
        id
        title
        content
        tags
      }
    }
  }
`
const rootValue = {}

it('should edit question data if he/she is owner', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })
  const context = getContext({ user })
  const variables = {
    id: toGlobalId('Question', question._id),
    title: 'Some other question',
    content: 'What does the fox say again?',
    tags: ['fox', 'Old meme'],
  }

  const result = await graphql(schema, query, rootValue, context, variables)

  expect(result.data!.EditQuestion.question.title).toBe(variables.title)
  expect(result.data!.EditQuestion.question.content).toBe(variables.content)
  expect(result.data!.EditQuestion.question.tags[0]).toBe(
    slugify(variables.tags[0], { lower: true })
  )
  expect(result.data!.EditQuestion.question.tags[1]).toBe(
    slugify(variables.tags[1], { lower: true })
  )
})

it("should not edit question data if he/she isn't the owner", async () => {
  const userA = await createRows.createUser()
  const userB = await createRows.createUser()

  const question = await createRows.createQuestion({ author: userA._id })

  const context = getContext({ user: userB })

  const variables = {
    id: toGlobalId('Question', question._id),
    title: 'Some other question',
    content: 'What does the fox say again?',
    tags: ['fox', 'Old meme'],
  }

  const result = await graphql(schema, query, rootValue, context, variables)
  expect(result.data!.EditQuestion.error).toBeTruthy()
  expect(result.data!.EditQuestion.question).toBeFalsy()
})
