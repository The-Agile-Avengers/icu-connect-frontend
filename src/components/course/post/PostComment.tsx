import { Avatar, Box, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { UserModel } from "utils/types";
import { getAvatar } from "utils/utils";

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

// Visualisatio of a comment
// Logic is covered by the parent
export default function Comment({ user, text }: CommentValues) {
  return (
    <Grid container wrap="nowrap" spacing={2} style={{ padding: "5px" }}>
      <Grid item>
        <Tooltip title={user.username}>
          <Avatar alt={user.username} src={getAvatar(user.avatar)} />
        </Tooltip>
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <Box sx={{ ...commonStyles, borderRadius: "16px" }}>
          <Typography sx={{ marginLeft: "10px" }}>{text}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
