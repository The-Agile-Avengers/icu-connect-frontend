import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }

  interface PaletteOptions {
    accent: PaletteOptions["primary"];
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#11082F",
    },
    secondary: {
      main: "#EBF1FF",
    },
    accent: {
      main: "#21B34B",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h1: {
      fontSize: "3em",
      fontWeight: 600,
      color: "#000000",
      marginBottom: "0.75em",
    },
    h2: {
      fontSize: "2em",
      fontWeight: 600,
      color: "#000000",
      marginBottom: "0.5em",
    },
    h3: {
      fontSize: "1.25em",
      fontWeight: 600,
      color: "#000000",
      marginBottom: "0.5em",
    },
  },
});

export default theme;
