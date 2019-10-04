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

const gql = String.raw

const query = gql`
  query QuestionConnection($authorId: ID, $search: String) {
    questions(authorId: $authorId, search: $search) {
      edges {
        node {
          content
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
    await createRows.createQuestion({ author: user._id })

    const context = getContext({ user })

    const result = await graphql(schema, query, rootValue, context)

    expect(result).toMatchSnapshot()
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

    expect(result).toMatchSnapshot()
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

    expect(result).toMatchSnapshot()
  })
})

describe('when unauthenticated', () => {
  it('should retrieve the Question connection', async () => {
    const user = await createRows.createUser()
    await createRows.createQuestion({ author: user._id })

    const context = getContext()

    const result = await graphql(schema, query, rootValue, context)

    expect(result).toMatchSnapshot()
  })
})

it('should return how much time a question takes to get answered', async () => {
  const user = await createRows.createUser()
  const question = await createRows.createQuestion({ author: user._id })

  const context = getContext({ user })

  const answerQuery = gql`
    mutation AnswerQuery($question: ID!) {
      CreateAnswer(input: { question: $question, content: "Something" }) {
        error
      }
    }
  `
  const variables = {
    question: toGlobalId('Question', question._id),
  }

  const answerResponse = await graphql(schema, answerQuery, rootValue, context, variables)

  expect(answerResponse).toMatchSnapshot()

  const avgResponseQuery = gql`
    query {
      questionAvgResponse
    }
  `

  const avgResponse = await graphql(schema, avgResponseQuery, rootValue, context)

  expect(avgResponse).toMatchSnapshot()
})
