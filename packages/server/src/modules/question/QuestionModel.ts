import mongoose, { Schema, Document, Model } from 'mongoose'

import { IUser } from '../user/UserModel'
import { IAnswer } from '../answer/AnswerModel'

const questionSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    anonymous_views: {
      type: Number,
      default: 0,
    },
    tags: { type: [String] },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
    time_first_answer: Date,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'question',
  }
)

export interface IQuestion extends Document {
  content: string
  upvotes: IUser[]
  downvotes: IUser[]
  author: IUser | string
  views: IUser[]
  anonymous_views: number
  tags?: string[]
  answers: IAnswer[] | string[]
  createdAt: Date
  updatedAt: Date
  time_first_answer: Date
}

const QuestionModel: Model<IQuestion> = mongoose.model('Question', questionSchema)

export default QuestionModel
