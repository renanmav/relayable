/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import { createFragmentContainer, graphql, RelayProp } from 'react-relay'
import { navigate } from '@reach/router'
import { createQueryRendererModern } from '@yotta/web/src/relay'
import YottaLogo from '@yotta/web/src/components/YottaLogo'

import { Navbar_query } from './__generated__/Navbar_query.graphql'
import { Navbar, NavbarInner, LoginBtn, Right, Avatar } from './styles'

interface NavbarProps {
  query: Navbar_query
  relay: RelayProp
}

const NavbarComponent: React.FC<NavbarProps> = ({ query: { githubLoginUrl, me } }) => {
  const navigateToGithub = () => navigate(githubLoginUrl!)

  return (
    <Navbar>
      <NavbarInner>
        <YottaLogo img='assets/img/yotta-logo.svg' />
        <Right>
          {me ? (
            <Avatar src={me!.avatar_url!} />
          ) : (
            <LoginBtn onClick={navigateToGithub}>Login with GitHub</LoginBtn>
          )}
        </Right>
      </NavbarInner>
    </Navbar>
  )
}

const NavbarFragment = createFragmentContainer(NavbarComponent, {
  query: graphql`
    fragment Navbar_query on Query {
      githubLoginUrl
      me {
        avatar_url
      }
    }
  `,
})

export default createQueryRendererModern(
  NavbarFragment,
  NavbarComponent,
  {
    query: graphql`
      query NavbarQuery {
        ...Navbar_query
      }
    `,
  },
  () => (
    <Navbar>
      <NavbarInner>
        <YottaLogo img='assets/img/yotta-logo.svg' />
        <Right>
          <Avatar src={require('../../../assets/img/avatar-placeholder.jpg')} loading={1} />
        </Right>
      </NavbarInner>
    </Navbar>
  )
)
