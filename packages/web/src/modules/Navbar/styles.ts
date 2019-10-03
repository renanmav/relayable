import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => {
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
