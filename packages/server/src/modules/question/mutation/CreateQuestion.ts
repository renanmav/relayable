import { mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql'
import slugify from 'slugify'

import { GraphQLContext } from '../../../TypeDefinitions'
import QuestionModel from '../QuestionModel'
import QuestionType from '../QuestionType'
import { EVENTS } from '../../../pubSub'

export default mutationWithClientMutationId({
  name: 'CreateQuestion',
  description: 'Use this mutation to create a question',
  inputFields: {
    content: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: GraphQLList(GraphQLString) },
  },
  mutateAndGetPayload: async (data, { user, pubSub }: GraphQLContext) => {
    if (!user) return { error: 'You must be authenticated' }

    const _tags = data.tags as string[]
    const tags: string[] = []

    if (_tags) {
      _tags.map(_tag => {
        const tag = slugify(_tag, { lower: true })
        tags.push(tag)
      })
    }

    const question = new QuestionModel({ ...data, author: user, tags })

    await question.save()

    pubSub.publish(EVENTS.QUESTION.NEW, { NewQuestion: { question } })

    return { id: question._id }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: obj => obj.error,
    },
    question: {
      type: QuestionType,
      resolve: async ({ id }, _, { dataloaders: { QuestionLoader } }: GraphQLContext) =>
        (id ? QuestionLoader.load(id) : null),
    },
  },
})
