import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { padding: `${theme.spacing(2)}px 0px`, cursor: 'pointer' },
  })
)
