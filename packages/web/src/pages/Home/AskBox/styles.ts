import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export const QuestionField = withStyles(theme => ({
  root: {
    marginBottom: 0,
    '& .MuiOutlinedInput-root': {
      minHeight: 150,
      alignItems: 'flex-start',
      '& fieldset': {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      '&:hover fieldset': {
        borderWidth: 1,
        borderColor: theme.palette.grey[600],
      },
      '&.Mui-focused fieldset': {
        borderWidth: 1,
        borderColor: theme.palette.grey[600],
      },
      '& textarea': {
        height: '64px !important',
        'overflow-wrap': 'break-word',
      },
    },
  },
}))(TextField)

export const TagsField = withStyles(theme => ({
  root: {
    margin: 0,
    marginTop: -1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 0,
        borderTopWidth: 0,
      },
      '&:hover fieldset': {
        borderWidth: 1,
        borderColor: theme.palette.grey[600],
      },
      '&.Mui-focused fieldset': {
        borderWidth: 1,
        borderColor: theme.palette.grey[600],
      },
    },
  },
}))(TextField)

export const AskButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: -1,
    marginLeft: -1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}))(Button)

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    tags: {
      flexGrow: 1,
    },
    questionIcon: {
      marginRight: theme.spacing(1),
    },
    tagsIcon: {
      marginRight: theme.spacing(1),
      color: 'rgba(0, 0, 0, 0.54)',
    },
  })
)
