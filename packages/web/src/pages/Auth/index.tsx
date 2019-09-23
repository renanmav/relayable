import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { parse } from 'query-string'

const Auth: React.FC<RouteComponentProps> = ({ location }) => {
  const { code } = parse(location!.search)

  useEffect(() => {
    if (!code) return
    console.log(code)
  }, [])

  return <div />
}

export default Auth
