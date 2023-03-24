import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../../design/theme";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import { PageTitle } from "../../design/typography";

interface IProps {
  children?: React.ReactNode;
  title: string;
}

export type { IProps };

const Layout: React.FC<IProps> = ({ children, title }: IProps) => (
  <ThemeProvider theme={theme}>
    <Navbar />
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Box sx={{ display: "flex" }}>
      {/* Navigation Bar */}
      <Navbar />
      {/* defines padding of inner page */}
      <Box component="main" sx={{ flexGrow: 1, p: 6, heigth: "100%" }}>
        <PageTitle title={title} />
        {/* ACTUAL PAGE CONTENT */}
        {children}
      </Box>
    </Box>
  </ThemeProvider>
);

/*
 * Don't forget to export your component!
 */
export default Layout;
