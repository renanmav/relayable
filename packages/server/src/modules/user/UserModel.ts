import mongoose, { Schema, Document, Model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  social: {
    facebookProvider: {
      id: String,
      token: String
    }
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'user'
})

export interface IUser extends Document {
  name: string
  email: string
  social: {
    facebookProvider: {
      id: string,
      token: string
    }
  }
}

const UserModel: Model<IUser> = mongoose.model('User', userSchema)

export default UserModel
