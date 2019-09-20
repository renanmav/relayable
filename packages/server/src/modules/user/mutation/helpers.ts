import 'isomorphic-fetch'

interface ICredentials {
  client_id: string
  client_secret: string
  code: string
}

interface ITokenResponse {
  access_token: string
  token_type: string
  scope: string
}

const requestGithubToken = async (credentials: ICredentials): Promise<ITokenResponse> =>
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(res => res.json())
    .catch(error => {
      throw new Error(JSON.stringify(error))
    })

export const requestGithubUserAccount = async (token: string): Promise<IGithubUser> =>
  fetch(`https://api.github.com/user?access_token=${token}`)
    .then(res => res.json())
    .catch(error => {
      throw new Error(JSON.stringify(error))
    })

export type GithubUserResponse = IGithubUser & ITokenResponse

export const requestGithubUser = async (
  credentials: ICredentials
  // @ts-ignore
): GithubUserResponse => {
  const tokenResponse = await requestGithubToken(credentials)
  const githubUser = await requestGithubUserAccount(tokenResponse.access_token)
  return { ...githubUser, ...tokenResponse }
}

export interface IGithubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email?: string
  hireable?: boolean
  bio: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  private_gists: number
  total_private_repos: number
  owned_private_repos: number
  disk_usage: number
  collaborators: number
  two_factor_authentication: boolean
  plan: {
    name: string
    space: number
    collaborators: number
    private_repos: number
  }
}
