import { Request, Response } from 'koa'

export type GraphQLContext = {
  req: Request,
  res: Response
}
