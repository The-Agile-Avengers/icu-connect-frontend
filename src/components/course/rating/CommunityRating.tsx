import React from "react";
import { Avatar, Grid, Paper, Rating } from "@mui/material";
import { UserModel } from "../../../models/UserModel";
import { Legend } from "../../../design/typography";

export interface RatingValues {
  account: UserModel;
  ratingContent: number;
  ratingTeaching: number;
  ratingWorkload: number;
  textRating: string;
  time: string;
}

export default function CommunityRating({
  account,
  ratingContent,
  ratingTeaching,
  ratingWorkload,
  textRating,
  time,
}: RatingValues) {
  return (
    <Paper style={{ padding: "20px", margin: "20px 0" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={account.avatar} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "block" }}>
              <Legend label="Course Content" />
              <Rating value={ratingContent} readOnly />
            </div>
            <div style={{ display: "block" }}>
              <Legend label="Teaching" />
              <Rating value={ratingTeaching} readOnly />
            </div>
            <div style={{ display: "block" }}>
              <Legend label="Workload" />
              <Rating value={ratingWorkload} readOnly />
            </div>
          </div>
          <p style={{ textAlign: "left" }}>{textRating}</p>
          <p style={{ textAlign: "left", color: "gray" }}>Review: {time}</p>
        </Grid>
      </Grid>
    </Paper>
  );
}
