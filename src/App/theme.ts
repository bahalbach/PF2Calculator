import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    background: {
      default: "#222222",
    },
  },
});

export default theme;
