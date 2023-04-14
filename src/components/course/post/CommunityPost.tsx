import React, { useState } from "react";

import { Avatar, Grid, Paper } from "@mui/material";
import { UserModel } from "../../../models/UserModel";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Divider from '@mui/material/Divider';
import CommentsSection from "./CommentsSection";
import { SingleComment } from "utils/types";


export interface PostValues {
  communityId: string,
  postId: number;
  user: UserModel;
  title: string;
  postText: string;
  commentList: SingleComment[];
  time: string;
}

export default function CommunityPost({
  communityId,
  postId,
  user,
  title,
  postText,
  commentList,
  time,
}: PostValues) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleCommentButtonClick = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleLikeButtonClick = () => {
    setIsLiked(!isLiked);
  };

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
          <div style={{ float: "right", marginRight:"2em" }}>
            <CommentIcon color={commentsVisible? "success": "action"} onClick={handleCommentButtonClick}/>
            
          </div>
          <div style={{ float: "left" , marginLeft:"2em"}}>
            <ThumbUpIcon color={isLiked? "success": "action"} onClick={handleLikeButtonClick}/>
          </div>
          <Divider style={{marginTop:"50px"}}/>
          {commentsVisible && 
          <CommentsSection
          communityId={communityId}
          postId={postId} 
          commentList={commentList}/>
        }
        </Grid>
      </Grid>
    </Paper>
  );
}
