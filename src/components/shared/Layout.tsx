import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../../design/theme";
import Navbar from "../navbar/Navbar";
import Box from "@mui/material/Box";
import { PageTitle } from "../../design/typography";

interface IProps {
  children?: React.ReactNode;
  title?: string;
}

export type { IProps };

const Layout: React.FC<IProps> = ({ children, title }: IProps) => (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
        {title && <PageTitle title={title} />}
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
);

export default Layout;
