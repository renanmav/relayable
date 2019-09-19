import { User, Question, Answer } from '../src/model'

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

export const createQuestion = async (payload = {}) => {
  return new Question({
    title: 'Some question',
    content: 'What is the meaning of life?',
    ...payload,
  }).save()
}

export const createAnswer = async (question, payload = {}) => {
  const answer = new Answer({
    content: 'Some answer',
    question: question._id,
    ...payload,
  })

  await answer.save()

  question.answers.push(answer)
  await question.save()

  return answer
}
