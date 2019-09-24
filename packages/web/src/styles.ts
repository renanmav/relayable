import { createGlobalStyle } from 'styled-components'

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
