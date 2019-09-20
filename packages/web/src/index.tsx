/* eslint-disable import/order */
/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()

import { render } from 'react-dom'
import Router from './routes'

render(<Router />, document.getElementById('app'))
