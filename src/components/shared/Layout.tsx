import { CssBaseline, Switch, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import theme from "../../theme";
import { IProps } from "./types";

const Layout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

/*
 * Don't forget to export your component!
 */
export default Layout;
