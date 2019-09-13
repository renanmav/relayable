/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()

import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import app from './app'
import { graphqlPort } from './config'
import logger, { getConsoleTransport } from './core/logger'
import { connectDatabase } from './database'
import { schema } from './schema'

logger.add(getConsoleTransport('graphql-main'))

connectDatabase()
  .then(() => {
    const server = createServer(app.callback())

    server.listen(graphqlPort, () => {
      logger.info(`Server started on port :${graphqlPort}`)

      SubscriptionServer.create(
        {
          onConnect: (cParams: any) =>
            logger.info('Client subscription connected!', cParams),
          onDisconnect: () => logger.info('Client subscription disconnected!'),
          execute,
          subscribe,
          schema
        },
        {
          server,
          path: '/subscriptions'
        }
      )
    })
  })
  .catch(error => {
    logger.error('Could not connect to database', { error })
    throw error
  })
