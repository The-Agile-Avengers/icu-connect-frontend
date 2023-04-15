import React from "react";

import { Avatar, Grid, Paper } from "@mui/material";
import { UserModel } from "../../../models/UserModel";
import CommentIcon from "@mui/icons-material/Comment";

export interface PostValues {
  user: UserModel;
  title: string;
  postText: string;
  time: string;
}

export default function CommunityPost({
  user,
  title,
  postText,
  time,
}: PostValues) {
  return (
    <Paper style={{ padding: "20px", margin: "20px 0" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={user.avatar} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{title}</h4>
          <p style={{ textAlign: "left" }}>{postText}</p>
          <p style={{ textAlign: "left", color: "gray" }}>posted on {time}</p>
          <div style={{ float: "right" }}>
            <CommentIcon />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
