import React from "react";
import Box from "@mui/material/Box";
import { BoxTitle } from "../../design/typography";
import Navbar from "../navbar/Navbar";
import { Grid, IconButton, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import Layout from "../shared/Layout";

/*type NewCourseForm = {
    content: number;
    teaching:number;
    workload: number;
    text: string;
  };*/

export default function CourseForm() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/coursePage/");
  }
  /*const [ratingContent, setRatingContent] = React.useState<number>(3);
  const [ratingTeaching, setRatingTeaching] = React.useState<number>(3);
  const [ratingWorkload, setRatingWorkload] = React.useState<number>(3);  
  const [textRating, setTextRating] = React.useState<string>("");
  
  const navigate = useNavigate();
  function handleClick() {
    navigate('/coursePage/');
  }

  let newCourseObj: NewCourseForm={
    content: ratingContent,
    teaching: ratingTeaching,
    workload: ratingWorkload,
    text: textRating
  }
  
  const { register, handleSubmit } = useForm<NewCourseForm>();
  
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onSubmit: SubmitHandler<NewCourseForm> = (formData) => {

    newCourseObj= {"content": 5, "teaching": 4, "workload": 4, "text": "adlv"}
    console.log(newCourseObj);
    
    api
      .post("/communities" , newCourseObj)
      .then((response) => {
        console.log(response.data);
        navigate("/coursePage" + response.data.id.toString());
        return "successfull";
      })
      .catch((error) => {
        console.log(error);
        return "error";
      });
  };*/
  return (
    <Box sx={{ gridArea: "info" }}>
      <IconButton aria-label="delete" onClick={handleClick}>
        <ArrowBackIosIcon />
      </IconButton>
      <BoxTitle title=" New Review" />
      <div style={{ padding: 14 }}>
        <Paper style={{ padding: " 20px" }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <div style={{ display: "block" }}>
                <p>Please rate the course: </p>
                <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                >
                  <Button variant="contained" type="submit">
                    SUBMIT
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Box>
  );
}
