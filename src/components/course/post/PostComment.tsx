import { Avatar, Box, Grid, Typography } from "@mui/material";
import { UserModel } from "utils/types";
import React from "react";

const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  border: 1,
  borderRadius: "16px",
  padding: "10px",
  paddingBotton: "20px",
  maxWidth: "80vw",
  overflowWrap: "break-word",
  wordWrap: "break-word",
};

export interface CommentValues {
  user: UserModel;
  text: string | null;
}

export default function Comment({ user, text }: CommentValues) {
  return (
    <Grid container wrap="nowrap" spacing={2} style={{ padding: "5px" }}>
      <Grid item>
        <Avatar alt="Remy Sharp" src={user.avatar} />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <Box sx={{ ...commonStyles, borderRadius: "16px" }}>
          <Typography sx={{ marginLeft: "10px" }}>{text}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
