import { Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Legend } from "../../../design/typography";
import { api } from "../../../utils/api";
import HoverRating from "./HoverRating";

type RatingForm = {
  content: number;
  teaching: number;
  workload: number;
  text: string;
};

interface CommunityRatingFormProps {
  courseId: string;
}

const defaultRatings = {
  content: 0,
  teaching: 0,
  workload: 0,
  text: "",
};

const CommunityRatingForm: React.FC<CommunityRatingFormProps> = ({
  courseId,
}: CommunityRatingFormProps) => {
  const [ratings, setRatings] = React.useState(defaultRatings);

  const setValueContent = (e: number | null) => {
    setRatings((prev) => ({ ...prev, content: e ? e : 0 }));
  };
  const setValueTeaching = (e: number | null) => {
    setRatings((prev) => ({ ...prev, teaching: e ? e : 0 }));
  };
  const setValueWorkload = (e: number | null) => {
    setRatings((prev) => ({ ...prev, workload: e ? e : 0 }));
  };

  const { register, handleSubmit, reset } = useForm<RatingForm>();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onSubmit: SubmitHandler<RatingForm> = (formData) => {
    ratings.text = formData.text;

    api
      .post(`/communities/${courseId}/ratings`, ratings)
      .then((response) => {
        console.log(response.data);
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
        <HoverRating
          value={ratings.content}
          setValue={setValueContent}
          type="CONTENT"
        />
        <Legend label="Teaching" />
        <HoverRating
          value={ratings.teaching}
          setValue={setValueTeaching}
          type="TEACHING"
        />
        <Legend label="Workload" />
        <HoverRating
          value={ratings.workload}
          setValue={setValueWorkload}
          type="WORKLOAD"
        />
        <TextField
          {...register("text", { required: false })}
          margin="normal"
          id="textRating"
          label="Rating
           Text"
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

export default CommunityRatingForm;
