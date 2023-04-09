import { Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
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


  const { register, handleSubmit , formState} = useForm<formValues>({
    mode: "onChange"
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (formData: any) => {
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
    <Paper style={{ padding: "20px"}}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={4}
          sx={{
            width: "100%",}}
          >
            <Grid 
              item 
              sx={{
              minWidth: "80%",
            }}>
              <TextField
                  {...register("name", { required: true })}
                  id="standard-basic"
                  label="Course Name"
                  variant="standard" 
                  fullWidth
                  />
            </Grid>
            <Grid 
              item
              sx={{
                minWidth:"80%"
            }}>
              <TextField
                {...register("moduleId", { required: true })}
                id="standard-basic"
                label="Course Number"
                variant="standard" 
                sx={{width: "100%"}}
                fullWidth/>
            </Grid>
            <Grid 
              item
              sx={{
                minWidth:"80%"
              }}>
              <TextField
                  {...register("ects", { required: true, valueAsNumber: true, validate: (value) => value > 0,})}
                  id="standard-basic"
                  label="ECTS"
                  type="number"
                  variant="standard"
                  sx={{width: "100%"}} />
            </Grid>
            <Grid 
              item
              sx={{
                minWidth:"80%"
            }}>
              <TextField
                  {...register("instructor.name", { required: true })}
                  id="standard-basic"
                  label="Teacher"
                  variant="standard"
                  sx={{width: "100%"}} />
            </Grid>
            <Grid 
              item
              sx={{
                minWidth:"80%"
            }}>
              <TextField
                  {...register("description", { required: true })}
                  id="outlined-multiline-static"
                  label="Course Description"
                  sx={{width: "100%"}}
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
  );
}
