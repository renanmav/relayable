/* eslint-disable import/first */
import * as dotenv from 'dotenv'
dotenv.config()

import { createServer } from 'http'
import app from './app'
import { graphqlPort } from './config'
import logger, { getConsoleTransport } from './core/logger'

logger.add(getConsoleTransport('graphql-main'))

const server = createServer(app.callback())

server.listen(graphqlPort, () => {
  logger.info(`Server started on port :${graphqlPort}`)
})
