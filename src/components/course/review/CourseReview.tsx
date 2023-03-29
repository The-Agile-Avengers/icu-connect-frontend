import React from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { UserModel } from "../../../Models/UserModel";
import { RatingContent, RatingTeaching, RatingWorkload } from "../ratingIcons";
import { Legend } from "../../../design/typography";

export interface ReviewValues {
  account: UserModel;
  ratingContent: number;
  ratingTeaching: number;
  ratingWorkload: number;
  textRating: string;
  time: string;
}

export default function CourseReview({
  account,
  ratingContent,
  ratingTeaching,
  ratingWorkload,
  textRating,
  time,
}: ReviewValues) {
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
              <RatingContent value={ratingContent} />
            </div>
            <div style={{ display: "block" }}>
              <Legend label="Teaching" />
              <RatingTeaching value={ratingTeaching} />
            </div>
            <div style={{ display: "block" }}>
              <Legend label="Workload" />
              <RatingWorkload value={ratingWorkload} />
            </div>
          </div>
          <p style={{ textAlign: "left" }}>{textRating}</p>
          <p style={{ textAlign: "left", color: "gray" }}>Review: {time}</p>
        </Grid>
      </Grid>
    </Paper>
  );
}
