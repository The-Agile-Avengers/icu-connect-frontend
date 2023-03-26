import React from "react";
import Box from "@mui/material/Box";
import { BoxTitle } from "../../../design/typography";
import Navbar from "../../navbar/Navbar";
import Layout from "../../shared/Layout";
import { Grid, IconButton, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

export default function CourseReviewForm() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/coursePage");
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        color: "#fff",
        "& > .MuiBox-root > .MuiBox-root": {
          p: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"header header"
              "info posts"
              "reviews posts"`,
        }}
      >
        <Box sx={{ gridArea: "info" }}>
          <IconButton aria-label="back" onClick={handleClick}>
            <ArrowBackIosIcon />
          </IconButton>
          <BoxTitle title=" New Post" />
          <div style={{ padding: 14 }}>
            <Paper style={{ padding: " 20px" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <div style={{ display: "block" }}>
                    <p>Enter the Post Title: </p>
                    <TextField
                      id="standard-basic"
                      label="Standard"
                      variant="standard"
                    />
                    <p>Your Post: </p>
                    <TextField
                      id="outlined-multiline-static"
                      label="Text Review"
                      multiline
                      rows={4}
                    />
                  </div>
                  <Button variant="contained">POST</Button>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
