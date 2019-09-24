import React from 'react'
import { createFragmentContainer, graphql, RelayProp } from 'react-relay'
import { navigate } from '@reach/router'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

import { createQueryRendererModern } from '@yotta/web/src/relay'
import YottaLogo from '@yotta/web/src/components/YottaLogo'

import { Navbar_query } from './__generated__/Navbar_query.graphql'

interface NavbarProps {
  query: Navbar_query
  relay: RelayProp
}

const useStyles = makeStyles(() =>
  createStyles({
    root: { flexGrow: 1 },
  })
)

const NavbarComponent: React.FC<NavbarProps> = ({ query: { githubLoginUrl, me } }) => {
  const navigateToGithub = () => navigate(githubLoginUrl!)

  const classes = useStyles()

  return (
    <AppBar position='static' color='inherit'>
      <Toolbar>
        <YottaLogo img='assets/img/yotta-logo.svg' className={classes.root} />
        {me ? (
          <Avatar src={me.avatar_url!} />
        ) : (
          <Button color='inherit' onClick={navigateToGithub}>
            Login with GitHub
          </Button>
        )}
      </Toolbar>
    </AppBar>
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

export default createQueryRendererModern(NavbarFragment, NavbarComponent, {
  query: graphql`
    query NavbarQuery {
      ...Navbar_query
    }
  `,
})
