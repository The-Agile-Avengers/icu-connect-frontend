import React from "react";
import { Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { api } from "../../../utils/api";
import { Post, PostForm } from "utils/types";
import { AxiosResponse } from "axios";

interface CommunityPostFormProps {
  id: string;
  // eslint-disable-next-line no-unused-vars
  addCommunityPost: (post: Post) => void;
}

function getDate(): string {
  const date = new Date();
  console.log(date);
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  const dateString = month + "." + day + "." + year;
  console.log(dateString);
  return dateString;
}

const CommunityPostForm: React.FC<CommunityPostFormProps> = ({
  id,
  addCommunityPost,
}: CommunityPostFormProps) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<PostForm>();

  // Check if all required fields are filled out
  const isAllFieldsFilled = watch("title") && watch("text"); // Update with your field names

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (formData: any) => {
    console.log(formData);
    api
      .post(`/communities/${id}/posts`, formData)
      .then((response: AxiosResponse<Post>) => {
        console.log(response.data);
        addCommunityPost({
          id: response.data.id,
          title: response.data.title,
          text: response.data.text,
          thumbsUp: response.data.thumbsUp,
          comments: response.data.comments,
          user: {
            id: 123,
            name: "WaitingForBackend",
            email: "ToDo@waitingforbackend.ch",
            avatar:
              "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
          },
          creation: getDate(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h5">Create New Post</Typography>
        <div style={{ display: "block" }}>
          <TextField
            {...register("title", { required: true, maxLength: 20 })}
            aria-invalid={errors.title ? "true" : "false"}
            sx={{ width: "100%", mb: 2 }}
            id="standard-basic"
            label="Post Title"
            variant="standard"
          />
          <TextField
            {...register("text", { required: true })}
            aria-invalid={errors.text ? "true" : "false"}
            sx={{ width: "100%", mb: 2 }}
            id="outlined-multiline-static"
            label="Post Text"
            multiline
          />
        </div>
        <Button type="submit" variant="contained" disabled={!isAllFieldsFilled}>
          POST
        </Button>
      </form>
    </Paper>
  );
};

export default CommunityPostForm;
