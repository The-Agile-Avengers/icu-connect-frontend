import React from "react";

import { Avatar, Grid, Paper } from "@mui/material";
import { UserModel } from "../../../Models/UserModel";
import CommentIcon from "@mui/icons-material/Comment";

export interface PostValues {
  account: UserModel;
  title: string;
  postText: string;
  time: string;
}

export default function CoursePost({
  account,
  title,
  postText,
  time,
}: PostValues) {
  return (
    <Paper style={{ padding: "20px", margin: "20px 0" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={account.avatar} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{title}</h4>
          <p style={{ textAlign: "left" }}>{postText}</p>
          <p style={{ textAlign: "left", color: "gray" }}>posted {time} ago</p>
          <div style={{ float: "right" }}>
            <CommentIcon />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}