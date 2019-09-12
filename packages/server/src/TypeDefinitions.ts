import { Request, Response } from 'koa'
import Dataloader from 'dataloader'
import { IUser } from './modules/user/UserModel'

type Key = string

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>
}

export type GraphQLContext = {
  req: Request,
  res: Response,
  dataloaders: Dataloaders,
  user?: IUser
}
