import React from "react";
import Box from "@mui/material/Box";
import { PageTitle } from "../design/typography";


export default function TemplatePage() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 4, heigth: "100%" }}>
      <Box sx={{ gridArea: "header" }}>
        <PageTitle title="Template Page" />
      </Box>
    </Box>
  );
}
