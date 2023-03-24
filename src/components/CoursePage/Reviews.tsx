import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Reviews() {
  const postTitle = "I have a question";
  const lables = "This is my question";

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        color: "#000000",
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item xs={8}>
          <Item>
            <a href="coursePage">{postTitle}</a>
            <Typography component="h2"> {postTitle} </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Typography component="h2"> {postTitle} </Typography>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <Typography component="h2"> {postTitle} </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
