import mongoose, { Schema, Document, Model } from 'mongoose'

const userSchema = new Schema({
  github_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  avatar_url: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'user'
})

export interface IUser extends Document {
  github_id: string
  name: string
  login: string
  avatar_url?: string
}

const UserModel: Model<IUser> = mongoose.model('User', userSchema)

export default UserModel
