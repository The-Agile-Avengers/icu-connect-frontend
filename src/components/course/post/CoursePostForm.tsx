import React from "react";
import { Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

export default function CourseReviewForm() {
  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5">Create New Post</Typography>
      <div style={{ display: "block" }}>
        <TextField
          sx={{ width: "100%", mb: 2 }}
          id="standard-basic"
          label="Post Title"
          variant="standard"
        />
        <TextField
          sx={{ width: "100%", mb: 2 }}
          id="outlined-multiline-static"
          label="Post Text"
          multiline
        />
      </div>
      <Button variant="contained">POST</Button>
    </Paper>
  );
}
