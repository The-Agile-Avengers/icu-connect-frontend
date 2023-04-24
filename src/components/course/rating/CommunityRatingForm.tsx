/* eslint-disable @typescript-eslint/no-misused-promises */
import { Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Legend } from "../../../design/typography";
import { api } from "../../../utils/api";
import HoverRating from "./HoverRating";
import { AxiosResponse } from "axios";
import { Rating, RatingForm } from "../../../utils/types";

interface CommunityRatingFormProps {
  id: string;
  // eslint-disable-next-line no-unused-vars
  addCommunityRating: (rating: Rating) => void;
}

const defaultRating = {
  content: 0,
  teaching: 0,
  workload: 0,
  text: null,
};

const CommunityRatingForm: React.FC<CommunityRatingFormProps> = ({
  id,
  addCommunityRating,
}: CommunityRatingFormProps) => {
  const [readOnly, setReadOnly] = React.useState(false);
  const [rating, setRating] = React.useState<RatingForm>(defaultRating);
  const { register, handleSubmit } = useForm<RatingForm>();
  const [isEnabled, setIsEnabled] = React.useState(false);

  useEffect(() => {
    const getRating = async () => {
      const { data } = await api.get<RatingForm>(
        `/users/communities/${id}/ratings`
      );

      if (data) {
        // ToDo: As long as backend sends more data than expected, we have to manually map it to the type
        setRating({
          content: data.content,
          teaching: data.teaching,
          workload: data.workload,
          text: data.text,
        });

        setReadOnly(true);
      }
    };

    void getRating();
  }, [id]);

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
      .then((response: AxiosResponse<Rating>) => {
        // ToDo: As long as backend sends more data than expected, we have to manually map it to the type
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
          user: {
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            //TODO
            avatar:
              "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            //TODO
            studyArea: " ",
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
          label={rating.text ?? "Rating Text"}
          multiline
          sx={{ width: "100%", mb: 2 }}
          disabled={readOnly}
          defaultValue={rating.text}
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
