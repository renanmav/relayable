import Koa, { Request, Response } from 'koa'
import Router from 'koa-router'
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

router.all('/graphql', graphqlServer)

app.use(router.routes()).use(router.allowedMethods())

export default app
