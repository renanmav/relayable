/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import { createFragmentContainer, graphql, RelayProp } from 'react-relay'
import { createQueryRendererModern } from '@yotta/web/src/relay'

import { Navbar, YottaLogo } from './styles'
import { Navbar_query } from './__generated__/Navbar_query.graphql'

interface NavbarProps {
  query: Navbar_query
  relay: RelayProp
}

const NavbarComponent: React.FC<NavbarProps> = ({ query: { githubLoginUrl } }) => (
  <Navbar>
    <YottaLogo src="assets/yotta-logo.svg" />
    <p>{githubLoginUrl}</p>
  </Navbar>
)

const NavbarFragment = createFragmentContainer(NavbarComponent, {
  query: graphql`
    fragment Navbar_query on Query {
      githubLoginUrl
    }
  `,
})

export default createQueryRendererModern(NavbarFragment, NavbarComponent, {
  query: graphql`
    query NavbarQuery {
      ...Navbar_query
    }
  `,
})
