import Koa, { Request, Response } from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import Router from 'koa-router'
import logger from 'koa-logger'
import koaPlayground from 'graphql-playground-middleware-koa'
import graphqlHttp, { Options } from 'koa-graphql'

import { schema } from './schema'

const app = new Koa()
const router = new Router()

const graphqlSettingsPerReq = async (req: Request, res: Response) => {
  const options: Options = {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context: {
      req,
      res
    }
  }
  return options
}

const graphqlServer = graphqlHttp(graphqlSettingsPerReq)

router.all('/graphql', bodyParser(), graphqlServer)
router.all('/graphiql', koaPlayground({ endpoint: '/graphql' }))

app.use(logger())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

export default app
