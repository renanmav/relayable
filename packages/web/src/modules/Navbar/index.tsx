import React from 'react'
import { createFragmentContainer, graphql, RelayProp, commitLocalUpdate } from 'react-relay'
import { navigate } from '@reach/router'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'

import { createQueryRendererModern } from '@yotta/web/src/relay'

import env from '@yotta/web/src/relay/Environment'
import { yottaDarkTheme } from '@yotta/web/src/utils/contants'

import YottaLogo from './YottaLogo'

import { Navbar_query } from './__generated__/Navbar_query.graphql'
import { useStyles } from './styles'

interface NavbarProps {
  query: Navbar_query
  relay: RelayProp
}

const NavbarComponent: React.FC<NavbarProps> = ({ query: { githubLoginUrl, me } }) => {
  const navigateToGithub = () => navigate(githubLoginUrl!)

  const handleThemeChange = () => {
    commitLocalUpdate(env, store => {
      const settings = store.getRoot().getLinkedRecord('settings')
      settings!.setValue(!settings!.getValue('darkTheme'), 'darkTheme')

      const isDarkTheme = settings.getValue('darkTheme')
      localStorage.setItem(yottaDarkTheme, isDarkTheme)
    })
  }

  const classes = useStyles()

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <YottaLogo className={classes.root} />
        <IconButton onClick={handleThemeChange} edge="start" className={classes.theme}>
          <EmojiObjectsIcon fontSize="large" />
        </IconButton>
        {me ? (
          <Avatar src={me.avatar_url!} alt={me.name!} className={classes.avatar} />
        ) : (
          <Button className={classes.btn} onClick={navigateToGithub} size="large">
            Login with GitHub
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export const NavbarFragment = createFragmentContainer(NavbarComponent, {
  query: graphql`
    fragment Navbar_query on Query {
      githubLoginUrl
      me {
        avatar_url
        name
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
