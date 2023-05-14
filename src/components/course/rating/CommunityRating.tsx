import React from "react";
import { Avatar, Button, Grid, Paper, Rating, Tooltip } from "@mui/material";
import { UserModel } from "../../../utils/types";
import { Legend } from "../../../design/typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { CommunityModel } from "../../../utils/types";
import { api } from "utils/api";
import { getAvatar, getDate } from "utils/utils";
import { RatingModel } from "../../../utils/types";

export interface RatingValues {
  user: UserModel;
  moduleId: string;
  rating: RatingModel;
}

export default function CommunityRating({
  user,
  moduleId,
  rating,
}: RatingValues) {
  const [thumbsUp, setThumbsUp] = React.useState(rating.hasLiked);
  const [thumbsUpNumber, setThumbsUpNumber] = React.useState(rating.thumbsUp);

  async function like() {
    try {
      if (rating.id) {
        await api.post<CommunityModel>(
          `/communities/${moduleId}/ratings/${rating.id}/thumbsUp`,
          //TODO - tell backend to turn into PUT instead of POST with empty request body
          {}
        );
        setThumbsUp(!thumbsUp);
        setThumbsUpNumber(!thumbsUp ? thumbsUpNumber + 1 : thumbsUpNumber - 1);
      }
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  }

  return (
    <Paper style={{ padding: "20px", margin: "20px 0" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Tooltip title={user.username}>
            <Avatar alt={user.username} src={getAvatar(user.avatar)} />
          </Tooltip>
        </Grid>
        <Grid
          justifyContent="left"
          item
          xs
          zeroMinWidth
          style={{ padding: "16px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "block" }}>
              <Legend label="Course Content" />
              <Rating value={rating.content} readOnly />
            </div>
            <div style={{ display: "block" }}>
              <Legend label="Teaching" />
              <Rating value={rating.teaching} readOnly />
            </div>
            <div style={{ display: "block" }}>
              <Legend label="Workload" />
              <Rating value={rating.workload} readOnly />
            </div>
          </div>
          <p style={{ textAlign: "left" }}>{rating.text}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ textAlign: "left", color: "gray" }}>
              Created: {getDate(rating.creation)}
            </p>
            <Button
              variant={"text"}
              startIcon={
                <ThumbUpIcon color={thumbsUp ? "success" : "action"} />
              }
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={like}
            >
              {thumbsUpNumber}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
