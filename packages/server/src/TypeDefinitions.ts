import { Request, Response } from 'koa'
import Dataloader from 'dataloader'
import { IUser } from './modules/user/UserModel'
import { IQuestion } from './modules/question/QuestionModel'

type Key = string

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>
  QuestionLoader: Dataloader<Key, IQuestion>
}

export type GraphQLContext = {
  req: Request
  res: Response
  dataloaders: Dataloaders
  user?: IUser
}
