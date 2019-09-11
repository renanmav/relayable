/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()

import { createServer } from 'http'
import app from './app'
import { graphqlPort } from './config'
import logger, { getConsoleTransport } from './core/logger'
import { connectDatabase } from './database'

logger.add(getConsoleTransport('graphql-main'))

connectDatabase().then(() => {
  const server = createServer(app.callback())

  server.listen(graphqlPort, () => {
    logger.info(`Server started on port :${graphqlPort}`)
  })
}).catch(error => {
  logger.error('Could not connect to database', { error })
  throw error
})
