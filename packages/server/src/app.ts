import Koa, { Request, Response } from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import Router from 'koa-router'
import logger from 'koa-logger'
import koaPlayground from 'graphql-playground-middleware-koa'
import graphqlHttp, { Options } from 'koa-graphql'

import { schema } from './schema'
import { Loaders } from './interface/NodeInterface'
import * as loaders from './loader'
import { getUser } from './auth'
import pubSub from './pubSub'

const app = new Koa()
const router = new Router()

const graphqlSettingsPerReq = async (req: Request, res: Response) => {
  const { user } = await getUser(req.header.authorization)

  const AllLoaders: Loaders = loaders

  const dataloaders = Object.keys(AllLoaders).reduce(
    (acc, loaderKey) => ({
      ...acc,
      [loaderKey]: AllLoaders[loaderKey].getLoader()
    }),
    {}
  )

  const options: Options = {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context: {
      req,
      res,
      dataloaders,
      user,
      pubSub
    }
  }
  return options
}

const graphqlServer = graphqlHttp(graphqlSettingsPerReq)

router.all('/graphql', bodyParser(), graphqlServer)
if (process.env.NODE_ENV !== 'production') {
  router.all(
    '/graphiql',
    koaPlayground({
      endpoint: '/graphql',
      subscriptionEndpoint: '/subscriptions'
    })
  )
}

app.use(logger())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

export default app
