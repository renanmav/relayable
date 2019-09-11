import Koa, { Request } from 'koa'
import Router from 'koa-router'
import graphqlHttp, { Options } from 'koa-graphql'

import { schema } from './schema'

const app = new Koa()
const router = new Router()

const graphqlSettingsPerReq = async (req: Request) => {
  const options: Options = {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context: {
      req
    }
  }
  return options
}

const graphqlServer = graphqlHttp(graphqlSettingsPerReq)

router.all('/graphql', graphqlServer)

app.use(router.routes()).use(router.allowedMethods())

export default app
