import React, { useState } from 'react'

import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import CreateQuestion from './mutation/CreateQuestionMutation'

const AskBox: React.FC = () => {
  const [question, setQuestion] = useState('')
  const [tags, setTags] = useState('')

  const classes = useStyles()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    CreateQuestion.commit(
      {
        content: question,
        tags: tags.split(' '),
      },
      _response => {},
      () => {}
    )
  }

  return (
    <Container maxWidth="sm" id="ask-something">
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <QuestionField
          value={question}
          onChange={e => setQuestion(e.target.value)}
          variant="outlined"
          margin="normal"
          placeholder="What’s the answer to life, the universe and everything?"
          multiline
          fullWidth
        />
        <Box className={classes.footer}>
          <TagsField
            variant="outlined"
            margin="normal"
            className={classes.tags}
            InputProps={{ startAdornment: <LocalOfferIcon className={classes.tagsIcon} /> }}
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <AskButton type="submit">
            <QuestionAnswerIcon className={classes.questionIcon} />
            ASK
          </AskButton>
        </Box>
      </form>
    </Container>
  )
}

export default AskBox

const QuestionField = withStyles(theme => ({
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

const TagsField = withStyles(theme => ({
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

const AskButton = withStyles(theme => ({
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

const useStyles = makeStyles((theme: Theme) =>
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
      color: '#757575',
    },
  })
)
