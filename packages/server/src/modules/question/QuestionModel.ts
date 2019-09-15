import mongoose, { Schema, Document, Model } from 'mongoose'
import { IUser } from '../user/UserModel'

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
    tags: { type: [String] }
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
  author: IUser
  views: IUser[]
  tags?: string[]
  createdAt: {
    toISOString: () => string
    toString: () => string
  }
  updatedAt: {
    toISOString: () => string
    toString: () => string
  }
}

const UserModel: Model<IQuestion> = mongoose.model('Question', questionSchema)

export default UserModel
