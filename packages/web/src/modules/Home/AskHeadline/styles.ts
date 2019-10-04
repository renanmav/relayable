import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: `${theme.spacing(6)}px 0`,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      marginBottom: 30,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 23,
      textAlign: 'center',
      fontWeight: 300,
      color: theme.palette.grey[600],
    },
  })
)
