import { Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Legend } from "../../../design/typography";
import { api } from "../../../utils/api";
import { RatingTeaching, RatingContent, RatingWorkload } from "../ratingIcons";

type ReviewForm = {
  content: number;
  teaching: number;
  workload: number;
  text: string;
};

interface CourseReviewFormProps {
  courseId: string;
}

const CourseReviewForm: React.FC<CourseReviewFormProps> = ({
  courseId,
}: CourseReviewFormProps) => {
  const [ratingContent, setRatingContent] = React.useState<number>(3);
  const [ratingTeaching, setRatingTeaching] = React.useState<number>(3);
  const [ratingWorkload, setRatingWorkload] = React.useState<number>(3);
  const [textRating, setTextRating] = React.useState<string>("");

  const reviewObj: ReviewForm = {
    content: ratingContent,
    teaching: ratingTeaching,
    workload: ratingWorkload,
    text: textRating,
  };

  const { register, handleSubmit, reset } = useForm<ReviewForm>();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onSubmit: SubmitHandler<ReviewForm> = (formData) => {
    reviewObj.text = formData.text;
    //reviewObj = { content: 5, teaching: 4, workload: 4, text: "adlv" };
    console.log(typeof reviewObj);

    api
      .post(`/communities/${courseId}/ratings`, reviewObj)
      .then((response) => {
        console.log(response.data);
        setRatingContent(3);
        setRatingTeaching(3);
        setRatingWorkload(3);
        setTextRating("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Paper style={{ padding: "20px" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Rate Course
      </Typography>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <Legend label="Course Content" />
        <RatingContent
          value={ratingContent}
          onChange={(event, newValue) => {
            newValue = newValue ? newValue : 0;
            setRatingContent(newValue);
          }}
        />
        <Legend label="Teaching" />
        <RatingTeaching
          value={ratingTeaching}
          onChange={(event, newValue) => {
            newValue = newValue ? newValue : 0;
            setRatingTeaching(newValue);
          }}
        />
        <Legend label="Workload" />
        <RatingWorkload
          value={ratingWorkload}
          onChange={(event, newValue) => {
            newValue = newValue ? newValue : 0;
            setRatingWorkload(newValue);
          }}
        />
        <TextField
          {...register("text", { required: false })}
          margin="normal"
          id="textRating"
          label="Review Text"
          multiline
          sx={{ width: "100%", mb: 2 }}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={() => {
            reset((formValues) => ({
              ...formValues,
              text: "",
            }));
          }}
        >
          SUBMIT
        </Button>
      </form>
    </Paper>
  );
};

export default CourseReviewForm;
