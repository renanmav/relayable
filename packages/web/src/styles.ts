import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --theme-pink: #F05B80;
    --theme-purple: #4158F0;
    --theme-light-grey: #E5E5E5
  }

  * {
    box-sizing: border-box;
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
