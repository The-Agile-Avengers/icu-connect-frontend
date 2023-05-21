import { Autocomplete, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { api } from "../../utils/api";
import { Instructor } from "utils/types";

type formValues = {
  moduleId: string;
  name: string;
  instructor: {
    name: string;
  };
  description: string;
  ects: number;
};

type FormFormResponseData = {
  data: {
    moduleId: string;
    name: string;
    instructor: {
      id: number;
      name: string;
    };
    subscribersCount: number;
    ects: number;
    rating: {
      id: number;
      teaching: number;
      content: number;
      workload: number;
    };
    joined: boolean;
  };
};

// Form used to create a new community. Handles the logic by itself.
export default function CommunityCreate() {
  const navigate = useNavigate();
  const [instructorList, setInstructorList] = useState<string[]>([]);

  const { register, handleSubmit, formState, setError } = useForm<formValues>({
    mode: "onChange",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (formData: any) => {
    api
      .post(`/communities`, formData)
      .then((response: FormFormResponseData) => {
        const moduleId: string = response.data.moduleId;
        navigate(`/community/${moduleId}`);
      })
      .catch((error) => {
        setError("moduleId", {
          type: "manual",
          message: "Module ID already exists",
        });
        console.log(error);
      });
  };

  const getTeachers = async () => {
    try {
      const { data } = await api.get<Instructor[]>("/instructors");
      const teachers: string[] = data.map(
        (teacher: Instructor) => teacher.name
      );
      setInstructorList(teachers);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    void getTeachers();
  }, []);

  return (
    <Paper style={{ padding: "20px" }}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={4}
          sx={{
            width: "100%",
          }}
        >
          <Grid
            item
            sx={{
              minWidth: "80%",
            }}
          >
            <TextField
              {...register("name", { required: true })}
              id="standard-basic"
              label="Course Name"
              variant="standard"
              fullWidth
              inputProps={{ maxLength: 40 }}
            />
          </Grid>
          <Grid
            item
            sx={{
              minWidth: "80%",
            }}
          >
            <TextField
              {...register("moduleId", { required: true })}
              id="standard-basic"
              label="Course ID"
              variant="standard"
              sx={{ width: "100%" }}
              fullWidth
              inputProps={{ maxLength: 15 }}
              error={!!formState.errors.moduleId}
              helperText={formState.errors.moduleId?.message}
            />
          </Grid>
          <Grid
            item
            sx={{
              minWidth: "80%",
            }}
          >
            <TextField
              {...register("ects", {
                required: true,
                valueAsNumber: true,
                validate: (value) => value > 0,
              })}
              id="standard-basic"
              label="ECTS"
              variant="standard"
              sx={{ width: "100%" }}
              inputProps={{ maxLength: 2 }}
            />
          </Grid>
          <Grid
            item
            sx={{
              minWidth: "80%",
            }}
          >
            <Autocomplete
              freeSolo
              id="combo-box-demo"
              options={instructorList}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("instructor.name", { required: true })}
                  label="Teacher"
                />
              )}
            />
          </Grid>
          <Grid
            item
            sx={{
              minWidth: "80%",
            }}
          >
            <TextField
              {...register("description", { required: false })}
              id="outlined-multiline-static"
              label="Course Description"
              sx={{ width: "100%" }}
              multiline
              rows={4}
              inputProps={{ maxLength: 350 }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              disabled={!formState.isValid}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
