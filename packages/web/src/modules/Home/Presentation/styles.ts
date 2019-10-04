import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: '100vh',
    },
    bg: {
      width: '100%',
    },
    container: {
      maxWidth: 1000,
    },
    textBox: { position: 'absolute', top: 120 },
    intro: { fontWeight: 'bolder', lineHeight: 1.3, color: theme.palette.primary.contrastText },
    callToAction: {
      marginTop: 70,
      fontWeight: 'bolder',
      fontSize: 28,
      cursor: 'pointer',
      textDecoration: 'underline',
      color: theme.palette.primary.contrastText,
    },
    conversation: { marginLeft: 350, marginTop: -50 },
  })
)
