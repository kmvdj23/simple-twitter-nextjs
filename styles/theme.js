import { createTheme, responsiveFontSizes } from "@mui/material/styles"

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      black: "#444F45",
      white: "#f3f3f3",
    },
    primary: {
      main: "#93B874",
    },
    secondary: {
      main: "#E7EEE0",
    },
    background: {
      default: "#f3f3f3",
      paper: "#f6f8f7",
    },
  },
})

export default responsiveFontSizes(theme)
