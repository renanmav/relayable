/* eslint-disable import/first */
import * as dotenv from 'dotenv'
dotenv.config()

import { createServer } from 'http'
import app from './app'
import { graphqlPort } from './config'

const server = createServer(app.callback())

server.listen(graphqlPort, () => console.log(`Server started on port :${graphqlPort}`))
