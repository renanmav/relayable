import React, { useState } from 'react'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

import { useStyles, QuestionField, TagsField, AskButton } from './styles'

import CreateQuestion from './mutation/CreateQuestionMutation'

const AskBox: React.FC = () => {
  const [question, setQuestion] = useState('')
  const [tags, setTags] = useState('')

  const classes = useStyles()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    CreateQuestion.commit(
      {
        title: question,
        content: question,
        tags: tags.split(' '),
      },
      _response => {},
      // @ts-ignore
      ({ errors }) => errors.map(error => console.log(error.message))
    )
  }

  return (
    <Container maxWidth="sm">
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
