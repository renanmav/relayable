import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql'
import slugify from 'slugify'

import { GraphQLContext } from '../../../TypeDefinitions'
import QuestionModel from '../QuestionModel'
import QuestionType from '../QuestionType'

export default mutationWithClientMutationId({
  name: 'EditQuestion',
  description: 'Mutation to edit the question if logged in user is the author',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) },
  },
  mutateAndGetPayload: async (data, { user }: GraphQLContext) => {
    if (!user) return { error: 'You must be authenticated' }

    const { id } = fromGlobalId(data.id)

    const question = await QuestionModel.findById(id)
    if (!question) return { error: "Question doesn't exists" }

    // eslint-disable-next-line eqeqeq
    if (question.author.toString() != user._id) {
      return { error: "You don't own this question" }
    }

    const { content } = data

    if (content) question.content = content

    const _tags = data.tags as string[]
    const tags: string[] = []

    if (_tags) {
      _tags.map(_tag => {
        const tag = slugify(_tag, { lower: true })
        tags.push(tag)
      })
      question.tags = tags
    }

    await question.save()

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
