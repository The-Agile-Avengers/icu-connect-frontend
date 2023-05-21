/* eslint-disable @typescript-eslint/no-misused-promises */
import { Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Legend } from "../../../design/typography";
import { api } from "../../../utils/api";
import HoverRating from "./HoverRating";
import { AxiosResponse } from "axios";
import { RatingModel, RatingForm } from "../../../utils/types";

interface CommunityRatingFormProps {
  id: string;
  rating: RatingForm;
  readOnly: boolean;
  // eslint-disable-next-line no-unused-vars
  setReadOnly: (readOnly: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  setRating: (rating: RatingForm) => void;
  // eslint-disable-next-line no-unused-vars
  addCommunityRating: (rating: RatingModel) => void;
}

// Component to create a new rating or show your own rating.
// Handles own logic.
const CommunityRatingForm: React.FC<CommunityRatingFormProps> = ({
  id,
  rating,
  readOnly,
  setReadOnly,
  setRating,
  addCommunityRating,
}: CommunityRatingFormProps) => {
  const { register, handleSubmit } = useForm<RatingForm>();
  const [isEnabled, setIsEnabled] = React.useState(false);

  useEffect(() => {
    const allValuesPresent = Object.values(rating).every(
      (value) => value !== 0
    );
    setIsEnabled(allValuesPresent);
  }, [rating]);

  const onSubmit: SubmitHandler<RatingForm> = (formData) => {
    rating.text = formData.text;

    api
      .post(`/communities/${id}/ratings`, rating)
      .then((response: AxiosResponse<RatingModel>) => {
        setRating({
          content: response.data.content,
          teaching: response.data.teaching,
          workload: response.data.workload,
          text: response.data.text,
        });
        addCommunityRating({
          id: response.data.id,
          content: response.data.content,
          teaching: response.data.teaching,
          workload: response.data.workload,
          text: response.data.text,
          thumbsUp: response.data.thumbsUp,
          hasLiked: false,
          user: {
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            avatar: response.data.user.avatar,
            studyArea: response.data.user.studyArea,
          },
          creation: response.data.creation,
        });

        setReadOnly(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Paper style={{ padding: "20px" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {readOnly ? "Your Rating" : "Rate Course"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Legend label="Course Content" />
        <HoverRating
          value={rating.content}
          setValue={(value) =>
            setRating({
              ...rating,
              content: value ?? rating.content,
            })
          }
          readonly={readOnly}
          type="CONTENT"
        />
        <Legend label="Teaching" />
        <HoverRating
          value={rating.teaching}
          setValue={(value) =>
            setRating({
              ...rating,
              teaching: value ?? rating.teaching,
            })
          }
          readonly={readOnly}
          type="TEACHING"
        />
        <Legend label="Workload" />
        <HoverRating
          value={rating.workload}
          setValue={(value) =>
            setRating({
              ...rating,
              workload: value ?? rating.workload,
            })
          }
          readonly={readOnly}
          type="WORKLOAD"
        />
        <TextField
          {...register("text", { required: false })}
          margin="normal"
          id="textRating"
          label="Rating Text"
          multiline
          sx={{ width: "100%", mb: 2 }}
          disabled={readOnly}
          defaultValue={rating.text}
          inputProps={{ maxLength: 200 }}
        />
        {!readOnly && (
          <Button disabled={!isEnabled} variant="contained" type="submit">
            SUBMIT
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default CommunityRatingForm;
