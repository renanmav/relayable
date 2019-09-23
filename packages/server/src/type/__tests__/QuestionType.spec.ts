import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'

import { schema } from '../../schema'
import {
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  getContext,
  createRows,
} from '../../../test/helper'

beforeAll(connectMongoose)

beforeEach(clearDbAndRestartCounters)

afterAll(disconnectMongoose)

const query = `
  query QuestionConnection(
    $authorId: ID
    $search: String
  ) {
    questions(
      authorId: $authorId
      search: $search
    ) {
      edges {
        node {
          title
          tags
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

  it('should retrieve only questions done by user if authorId its provided', async () => {
    const userA = await createRows.createUser()
    const userB = await createRows.createUser()

    await createRows.createQuestion({ author: userA._id })
    await createRows.createQuestion({ author: userB._id })

    const context = await getContext({ user: userB })

    const variables = {
      authorId: toGlobalId('User', userA._id),
    }

    const result = await graphql(schema, query, rootValue, context, variables)

    expect(result.data!.questions.edges[0].node.author.name).toBe(userA.name)
    expect(result.data!.questions.edges[1]).toBeUndefined()
  })

  it('should search on authorId response', async () => {
    const userA = await createRows.createUser()
    const userB = await createRows.createUser()

    await createRows.createQuestion({ author: userA._id, tags: ['42'] })
    await createRows.createQuestion({ author: userA._id })

    await createRows.createQuestion({ author: userB._id })

    const context = await getContext({ user: userB })

    const variables = {
      authorId: toGlobalId('User', userA._id),
      search: '42',
    }

    const result = await graphql(schema, query, rootValue, context, variables)

    expect(result.data!.questions.edges[0].node.author.name).toBe(userA.name)
    expect(result.data!.questions.edges[0].node.tags[0]).toBe('42')
    expect(result.data!.questions.edges[1]).toBeUndefined()
    expect(result.data!.questions.edges[2]).toBeUndefined()
  })
})

describe('when unauthenticated', () => {
  it('should retrieve the Question connection', async () => {
    const user = await createRows.createUser()
    const question = await createRows.createQuestion({ author: user._id })

    const context = getContext()

    const result = await graphql(schema, query, rootValue, context)

    expect(result.data!.questions.edges[0].node.title).toBe(question.title)
    expect(result.data!.questions.edges[0].node.author.name).toBe(user.name)
  })
})

it('should return how much time a question takes to get answered', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })

  const context = getContext({ user })

  const answerQuery = `
    mutation AnswerQuery(
      $question: ID!
    ) {
      CreateAnswer(input: {
        question: $question
        content: "Something"
      }) {
        error
      }
    }
  `
  const variables = {
    question: toGlobalId('Question', question._id),
  }

  const answerResponse = await graphql(schema, answerQuery, rootValue, context, variables)

  expect(answerResponse.data!.CreateAnswer.error).toBeNull()

  const avgResponseQuery = `
    query {
      questionAvgResponse
    }
  `

  const avgResponse = await graphql(schema, avgResponseQuery, rootValue, context)

  expect(avgResponse.data!.questionAvgResponse).toBeTruthy()
})
