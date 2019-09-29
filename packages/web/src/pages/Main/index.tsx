import React from 'react'
import { graphql } from 'react-relay'

import ThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'

import Routes from '@yotta/web/src/routes'

import { useQuery } from '@entria/relay-experimental'

import { darkTheme, lightTheme } from './styles'
import { MainQuery } from './__generated__/MainQuery.graphql'

const Main: React.FC<{}> = () => {
  const {
    settings: { darkTheme: isDark },
  } = useQuery<MainQuery>(graphql`
    query MainQuery {
      __typename
      settings {
        darkTheme
      }
    }
  `)

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default Main
