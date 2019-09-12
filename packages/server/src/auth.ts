import { requestGithubUserAccount } from './modules/user/mutation/helpers'
import UserModel, { IUser } from './modules/user/UserModel'

// @ts-ignore
export async function getUser (token: string): { user: IUser | null } {
  if (!token) return { user: null }

  try {
    const userGithub = await requestGithubUserAccount(token)

    const user = await UserModel.findOne({ github_id: userGithub.id })

    return { user }
  } catch (err) {
    return { user: null }
  }
}
