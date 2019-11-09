import React from 'react'
import { graphql } from 'react-relay'
import { useQuery } from '@entria/relay-experimental'

import ThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'

import Routes from '@relayable/web/src/routes'

import { MainQuery } from './__generated__/MainQuery.graphql'

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#F05B80',
      contrastText: '#F8F9FA',
    },
    secondary: {
      main: '#4158F0',
      contrastText: '#F8F9FA',
    },
    tonalOffset: 0.05,
    background: {
      default: '#F8F9FA',
    },
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#F05B80',
      contrastText: '#303030',
    },
    secondary: {
      main: '#4158F0',
      contrastText: '#303030',
    },
    tonalOffset: 0.05,
    type: 'dark',
  },
})

const Main: React.FC = () => {
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
