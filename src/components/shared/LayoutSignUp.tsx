import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../../design/theme";
import { IProps } from "../../utils/types";

const LayoutSignUp: React.FC<IProps> = ({ children }: IProps) => (
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    {children}
  </ThemeProvider>
);

/*
 * Don't forget to export your component!
 */
export default LayoutSignUp;
