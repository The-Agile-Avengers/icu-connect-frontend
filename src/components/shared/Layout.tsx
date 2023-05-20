import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import theme from "../../design/theme";
import Navbar from "../navbar/Navbar";
import Box from "@mui/material/Box";
import { PageTitle } from "../../design/typography";

interface IProps {
  children?: React.ReactNode;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  button?: ReactElement<any, any>;
}

export type { IProps };

const Layout: React.FC<IProps> = ({ children, title, button }: IProps) => {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth > 600);
    };

    // Call handleResize initially and add event listener for resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <CssBaseline />
        <Box
          sx={{ display: "flex", flexDirection: "column", p: 6, width: "100%" }}
        >
          <header
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {title && <PageTitle title={title} />}
            {showButton && <div style={{ alignSelf: "start" }}>{button}</div>}
          </header>
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
};

export default Layout;
