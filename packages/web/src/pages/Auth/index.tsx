import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { parse } from 'query-string'
import { yottaToken, yottaUser } from '@yotta/web/src/utils/contants'

import LoginWithGithubMutation from './mutation/LoginWithGithubMutation'

const Auth: React.FC<RouteComponentProps> = ({ location, navigate }) => {
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
      error => console.log(error)
    )
  }, [])

  return <div />
}

export default Auth
