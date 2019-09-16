import mongoose, { Schema, Document, Model } from 'mongoose'
import { IUser } from '../user/UserModel'
import { IAnswer } from '../answer/AnswerModel'

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    views: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    tags: { type: [String] },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    collection: 'question'
  }
)

export interface IQuestion extends Document {
  title: string
  content: string
  upvotes: IUser[]
  downvotes: IUser[]
  author: IUser | string
  views: IUser[]
  tags?: string[]
  answers: IAnswer[]
  createdAt: {
    toISOString: () => string
    toString: () => string
  }
  updatedAt: {
    toISOString: () => string
    toString: () => string
  }
}

const QuestionModel: Model<IQuestion> = mongoose.model(
  'Question',
  questionSchema
)

export default QuestionModel
