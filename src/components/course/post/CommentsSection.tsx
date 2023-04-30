import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { SingleComment, CommentForm } from "../../../utils/types";
import PostComment from "./PostComment";
import { useForm } from "react-hook-form";
import { api } from "utils/api";
import { AxiosResponse } from "axios";
import { getDate } from "utils/utils";

export interface CommentSectionValues {
  communityId: string;
  postId: number;
  commentList: SingleComment[];
}

export default function CommentsSection({
  communityId,
  postId,
  commentList,
}: CommentSectionValues) {
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] =
    useState<SingleComment[]>(commentList);

  const handleCommentChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCommentText(e.target.value);
  };

  const addNewComment = (comment: SingleComment) => {
    setCommentsList([...commentsList, comment]);
  };

  const { register, handleSubmit } = useForm<CommentForm>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (formData: any) => {
    api
      .post(`/communities/${communityId}/posts/${postId}/comments`, formData)
      .then((response: AxiosResponse<SingleComment>) => {
        addNewComment({
          id: response.data.id,
          text: response.data.text,
          user: response.data.user,
          creation: getDate(response.data.creation),
        });
        setCommentText("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {commentsList.map((comment: SingleComment) => (
        <PostComment key={comment.id} user={comment.user} text={comment.text} />
      ))}

      <form // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ display: "flex", alignItems: "center", padding: "5px" }}>
          <TextField
            {...register("text", { required: true })}
            value={commentText}
            onChange={handleCommentChange}
            variant="standard"
            multiline
            sx={{ flexGrow: 1, p: 1 }}
            placeholder="Write a comment..."
          />
          <Button
            type="submit"
            disabled={commentText == "" ? true : false}
            sx={{ mx: 1 }}
          >
            <SendIcon />
          </Button>
        </Box>
      </form>
    </>
  );
}
