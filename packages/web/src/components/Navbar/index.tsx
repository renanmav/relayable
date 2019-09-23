/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import { createFragmentContainer, graphql, RelayProp } from 'react-relay'
import { createQueryRendererModern } from '@yotta/web/src/relay'
import LoginBtn from '@yotta/web/src/components/LoginBtn'
import YottaLogo from '@yotta/web/src/components/YottaLogo'

import { Navbar_query } from './__generated__/Navbar_query.graphql'
import { Navbar, NavbarInner } from './styles'

interface NavbarProps {
  query: Navbar_query
  relay: RelayProp
}

const NavbarComponent: React.FC<NavbarProps> = () => (
  <Navbar>
    <NavbarInner>
      <YottaLogo img='assets/img/yotta-logo.svg' />
      <LoginBtn>Login with GitHub</LoginBtn>
    </NavbarInner>
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
