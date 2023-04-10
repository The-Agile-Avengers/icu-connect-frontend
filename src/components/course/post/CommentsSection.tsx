import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Comment } from "../../../utils/types";
import PostComment from './PostComment';

export default function CommentsSection({
  comments,
  }: {
    comments: Comment[];
  }) {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCommentText(e.target.value);
  };
  
  return (
    <>
    {comments.map(( comment: Comment ) => (
        <PostComment key={comment.id} user={comment.user} text={comment.text}/>
      ))}
    
    <form >
        <Box sx={{ display: 'flex', alignItems: 'center', padding: "5px"}}>
        <TextField
          value={commentText}
          onChange={handleCommentChange}
          variant="standard"
          multiline
          sx={{ flexGrow: 1, p: 1 }}
          placeholder="Write a comment..."
        />
        <Button sx={{ mx: 1 }}>
          <SendIcon />
        </Button>
        </Box>
      </form>
    </>
  );
}
