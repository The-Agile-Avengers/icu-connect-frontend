import React from "react";
import { Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../utils/api";


interface CommunityPostFormProps {
  courseId: string;
}


const CommunityPostForm: React.FC<CommunityPostFormProps> = ({
    courseId,
  }: CommunityPostFormProps) => {

    const { register,formState: { errors }, handleSubmit, setError, reset } = useForm();
  
    const onSubmit = (formData: any) => {
      console.log(formData)
      api
      .post(`/communities/${courseId}/posts`, formData)
        .then((response) => {
          console.log(response.data);
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
        />{errors.title?.type === 'required' && <p role="alert" color="#21B34B">Title is required</p>}
        <TextField
          {...register("text", { required: true})}
          aria-invalid={errors.text ? "true" : "false"}
          sx={{ width: "100%", mb: 2 }}
          id="outlined-multiline-static"
          label="Post Text"
          multiline
        />{errors.text?.type === 'required' && <p role="alert" color="#21B34B">Post Text is required</p>}
      </div>
      <Button type="submit" variant="contained"
      onClick={() => {
        reset((formValues) => ({
          ...formValues,
          title: "",
          text: "",
        }));
      }}>POST</Button>
      </form>
    </Paper>
  );
}

export default CommunityPostForm;