import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SignUp from "./components/SignUpForm";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <SignUp />
      </Box>
    </Container>
  );
}
