import { createGlobalStyle } from 'styled-components'
import { createMuiTheme } from '@material-ui/core/styles'

export default createGlobalStyle`
  :root {
    --theme-pink: #F05B80;
    --theme-purple: #4158F0;
    --theme-light-grey: #F8F9FA;
    --theme-dark-grey: #979797;
  }

  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html, body, #app {
    height: 100%;
  }

  body {
    margin: 0;
  }

  .router-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#F05B80',
      contrastText: '#F8F9FA',
    },
    secondary: {
      main: '#4158F0',
      contrastText: '#F8F9FA',
    },
    tonalOffset: 0.05,
  },
})
