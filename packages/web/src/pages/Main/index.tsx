import React from 'react'

import { ThemeProvider } from '@material-ui/styles'

import { createFragmentContainer, graphql, RelayProp } from 'react-relay'

import { createQueryRendererModern } from '@yotta/web/src/relay'
import Routes from '@yotta/web/src/routes'
import GlobalStyle, { darkTheme, lightTheme } from '@yotta/web/src/styles'

import { Main_query } from './__generated__/Main_query.graphql'

interface MainProps {
  query: Main_query
  relay: RelayProp
}

const Main: React.FC<MainProps> = ({
  query: {
    settings: { darkTheme: isDark },
  },
}) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Routes />
    </ThemeProvider>
  </>
)

const MainFragment = createFragmentContainer(Main, {
  query: graphql`
    fragment Main_query on Query {
      settings {
        darkTheme
      }
    }
  `,
})

export default createQueryRendererModern(MainFragment, Main, {
  query: graphql`
    query MainQuery {
      __typename
      ...Main_query
    }
  `,
})
