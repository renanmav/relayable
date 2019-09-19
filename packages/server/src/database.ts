import mongoose from 'mongoose'

import { dbUri } from './config'
import logger from './core/logger'

export function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => logger.warn('Database connection closed'))
      .once('open', () => resolve(mongoose.connections[0]))

    mongoose.connect(dbUri!, {
      useNewUrlParser: true,
      useCreateIndex: true,
    })
  })
}
