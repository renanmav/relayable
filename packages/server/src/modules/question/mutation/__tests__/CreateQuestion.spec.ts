import { getContext, createRows } from '../../../../../test/helper'
import { graphql } from 'graphql'
import { schema } from '../../../../schema'

const query = `
  mutation createQuestion(
    $title: String!
    $content: String!
  ) {
    CreateQuestion(input: {
      title: $title
      content: $content
    }) {
      error
      question {
        id
      }
    }
  }
`
const rootValue = {}

describe('when unauthenticated', () => {
  it('should not create a question', async () => {
    const context = getContext()
    const variables = {
      title: 'Test',
      content: 'Some question'
    }

    const result = await graphql(schema, query, rootValue, context, variables)
    expect(result.data!.CreateQuestion.error).toBeTruthy()
    expect(result.data!.CreateQuestion.question).toBeFalsy()
  })
})
