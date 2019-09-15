import { Request, Response } from 'koa'
import Dataloader from 'dataloader'
import { PubSub } from 'graphql-subscriptions'

import { IUser } from './modules/user/UserModel'
import { IQuestion } from './modules/question/QuestionModel'
import { IAnswer } from './modules/answer/AnswerModel'

type Key = string

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>
  QuestionLoader: Dataloader<Key, IQuestion>
  AnswerLoader: Dataloader<Key, IAnswer>
}

export type GraphQLContext = {
  req: Request
  res: Response
  dataloaders: Dataloaders
  user?: IUser
  pubSub: PubSub
}
