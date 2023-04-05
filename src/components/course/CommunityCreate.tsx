import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../shared/Layout";
import { useForm } from "react-hook-form";
import Grid from '@mui/material/Grid';
import { api } from "../../utils/api";

type formValues = {
  moduleId: string;
  name: string;
  instructor: {
        name: string;
  },
  description:string;
  ects:number;
};

type FormFormResponseData = {
  data: {
  moduleId: string,
  name: string,
  instructor: {
      id: number,
      name: string
  },
  subscribersCount: number,
  ects: number,
  rating: {
      id: number,
      teaching: number,
      content: number,
      workload: number
  },
  joined: boolean
}
}


export default function CommunityCreate() {
  const navigate = useNavigate();
  function handleClick() {
    //TODO redirect to community page
    navigate("/communities/1");
  }


  const { register, handleSubmit , formState} = useForm<formValues>({
    mode: "onChange"
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (formData: any) => {
    console.log(formData)
  console.log(formData)
    api
    .post(`/communities`, formData)
      .then((response: FormFormResponseData) => {
        console.log(response.data);
        const moduleId: string = response.data.moduleId
        navigate(`/community/${moduleId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <Layout title="Create a new Course">
      <IconButton aria-label="delete" style={{float: "left"}} onClick={handleClick}>
        <ArrowBackIosIcon />
      </IconButton>
      <Paper style={{ padding: "20px", maxWidth: "500px" }}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}>
     <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
      >
        <Grid item>
          <TextField
              {...register("name", { required: true })}
              id="standard-basic"
              label="Course Name"
              variant="standard" />
        </Grid>
        <Grid item>
          <TextField
            {...register("moduleId", { required: true })}
            id="standard-basic"
            label="Course Number"
            variant="standard" />
        </Grid>
        <Grid item>
        <TextField
            {...register("ects", { required: true, valueAsNumber: true, validate: (value) => value > 0,})}
            id="standard-basic"
            label="ECTS"
            type="number"
            variant="standard" />
        </Grid>
        <Grid item>
        <TextField
            {...register("instructor.name", { required: true })}
            id="standard-basic"
            label="Teacher"
            variant="standard" />
        </Grid>
        <Grid item>
          <TextField
              {...register("description", { required: true })}
              id="outlined-multiline-static"
              label="Course Description"
              multiline
              rows={4} />
        </Grid>
        <Grid item>
          <Button
                variant="contained"
                type="submit"
                disabled={!formState.isValid}
            
            >SUBMIT</Button>
        </Grid>
        
          
            
        
    </Grid>
    </form>
    </Paper>
    
    </Layout>
  );
}
