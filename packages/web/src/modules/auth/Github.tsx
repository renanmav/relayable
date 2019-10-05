import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { parse } from 'query-string'

import { yottaToken, yottaUser } from '../../utils/contants'

import LoginWithGithubMutation from './mutation/LoginWithGithubMutation'

const AuthGithub: React.FC<RouteComponentProps> = ({ location, navigate }) => {
  const { code } = parse(location!.search)

  useEffect(() => {
    if (!code) return

    LoginWithGithubMutation.commit(
      { code: code as string },
      response => {
        if (!response!.LoginWithGithub!.token) return

        const { token, user } = response!.LoginWithGithub!

        localStorage.setItem(yottaToken, token!)
        localStorage.setItem(yottaUser, JSON.stringify(user))

        navigate!('/')
      },
      // eslint-disable-next-line no-console
      error => console.log(error)
    )
  }, [])

  return <p>Loading</p>
}

export default AuthGithub
