import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 60,
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: { position: 'absolute', marginTop: 160 },
    content: { display: 'flex', alignItems: 'center' },
    site: { marginLeft: 10, fontWeight: 'bold', color: theme.palette.grey[700] },
    caption: { fontWeight: 'lighter', color: theme.palette.grey[700] },
    bg: { width: '100%' },
  })
)
