/* eslint-disable no-multi-assign */
import { IQuestion } from '@yotta/server/src/modules/question/QuestionModel'
import { IAnswer } from '@yotta/server/src/modules/answer/AnswerModel'

import { User, Question, Answer } from '../src/model'

export interface Global {
  document: Document
  window: Window
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __COUNTERS__: { [key: string]: any }
}

declare let global: Global

export const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__).reduce(
    (prev, curr) => ({ ...prev, [curr]: 0 }),
    {}
  )
}

export const createUser = async (payload = {}) => {
  const n = (global.__COUNTERS__.user += 1)

  return new User({
    github_id: n,
    name: `User ${n}`,
    login: `user${n}`,
    avatar_url: `http://localhost/files/${n}`,
    ...payload,
  }).save()
}

export const createQuestion = async (payload = {}) =>
  new Question({
    content: 'What is the meaning of life?',
    ...payload,
  }).save()

export const createAnswer = async (question: IQuestion, payload = {}) => {
  const answer = new Answer({
    content: 'Some answer',
    question: question._id,
    ...payload,
  })

  await answer.save()

  question.answers.push(answer as IAnswer & string)
  await question.save()

  return answer
}
