import React, { useState } from "react";

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Tooltip,
} from "@mui/material";
import { UserModel } from "../../../utils/types";
import CommentIcon from "@mui/icons-material/Comment";
import Divider from "@mui/material/Divider";
import CommentsSection from "./CommentsSection";
import { SingleComment } from "utils/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "utils/api";
import { getAvatar } from "utils/utils";

export interface PostValues {
  communityId: string;
  postId: number;
  user: UserModel;
  title: string;
  postText: string;
  commentList: SingleComment[];
  time: string;
  // eslint-disable-next-line no-unused-vars
  deleteCommunityPost: (id: number) => void;
}

export default function CommunityPost({
  communityId,
  postId,
  user,
  title,
  postText,
  commentList,
  time,
  deleteCommunityPost,
}: PostValues) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleDeleteButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    api
      .delete(`/communities/${communityId}/posts/${postId}`)
      .then(() => {
        deleteCommunityPost(postId);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkIfUserIsCreator = () => {
    const currentUser = localStorage.getItem("Username")
      ? localStorage.getItem("Username")
      : " ";
    return currentUser === user.username;
  };

  const handleCommentButtonClick = () => {
    setCommentsVisible(!commentsVisible);
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px 0" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Tooltip title={user.username}>
            <Avatar alt={user.username} src={getAvatar(user.avatar)} />
          </Tooltip>
        </Grid>

        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{title}</h4>
          <p style={{ textAlign: "left" }}>{postText}</p>
          <p style={{ textAlign: "left", color: "gray" }}>posted on {time}</p>
          <div style={{ float: "right", marginRight: "2em" }}>
            <CommentIcon
              color={commentsVisible ? "success" : "action"}
              onClick={handleCommentButtonClick}
            />
          </div>

          <Divider style={{ marginTop: "50px" }} />
          {commentsVisible && (
            <CommentsSection
              communityId={communityId}
              postId={postId}
              commentList={commentList}
            />
          )}
        </Grid>
        {checkIfUserIsCreator() && (
          <>
            <DeleteIcon
              onClick={handleDeleteButtonClick}
              style={{ cursor: "pointer" }}
            />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete your post?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {
                    "It's like throwing away a perfectly good pizza just because you accidentally put pineapple on it. You'll regret it later. But if you insist, go ahead and click 'Delete' and let the internet gods judge you for your actions. Otherwise, hit 'Cancel' and enjoy your controversial yet tasty creation."
                  }
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Grid>
    </Paper>
  );
}
