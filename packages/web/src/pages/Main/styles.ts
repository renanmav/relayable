import { createMuiTheme } from '@material-ui/core/styles'

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

export const darkTheme = createMuiTheme({
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
    type: 'dark',
  },
})
