import React from 'react'
import { graphql, commitLocalUpdate } from 'react-relay'
import { navigate } from '@reach/router'
import { useQuery } from '@entria/relay-experimental'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'

import env from '@relayable/web/src/relay/Environment'
import { yottaDarkTheme } from '@relayable/web/src/utils/contants'

import YottaLogo from './YottaLogo'

import { NavbarQuery } from './__generated__/NavbarQuery.graphql'

const Navbar: React.FC<{}> = () => {
  const { githubLoginUrl, me } = useQuery<NavbarQuery>(graphql`
    query NavbarQuery {
      githubLoginUrl
      me {
        avatar_url
        name
      }
    }
  `)

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

export default Navbar

const useStyles = makeStyles((theme: Theme) => {
  const { primary } = theme.palette
  return createStyles({
    root: { flexGrow: 1 },
    appBar: { display: 'flex', flexDirection: 'row', justifyContent: 'center' },
    toolBar: { maxWidth: 1000, flex: 1 },
    btn: {
      background: primary.main,
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        background: primary.dark,
      },
    },
    avatar: {
      height: 54,
      width: 54,
    },
    theme: {
      marginRight: theme.spacing(2),
    },
  })
})
