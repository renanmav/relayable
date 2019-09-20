import mongoose, { Schema, Document, Model } from 'mongoose'

import { IUser } from '../user/UserModel'
import { IQuestion } from '../question/QuestionModel'

const answerSchema = new Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
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
    is_accepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'answer',
  }
)

export interface IAnswer extends Document {
  question: IQuestion | string
  content: string
  upvotes: IUser[]
  downvotes: IUser[]
  author: IUser | string
  is_accepted: boolean
  createdAt: {
    toISOString: () => string
    toString: () => string
  }
  updatedAt: {
    toISOString: () => string
    toString: () => string
  }
}

const AnswerModel: Model<IAnswer> = mongoose.model('Answer', answerSchema)

export default AnswerModel
