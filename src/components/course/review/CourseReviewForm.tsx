import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import {
  IconContainerProps,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utils/api";

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIconsTeaching[value].icon}</span>;
}

const StyledRatingTeaching = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));
const customIconsTeaching: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

const StyledRatingContent = styled(Rating)(() => ({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
}));

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
  const [textRating] = React.useState<string>("");

  let reviewObj: ReviewForm = {
    content: ratingContent,
    teaching: ratingTeaching,
    workload: ratingWorkload,
    text: textRating,
  };

  const { register, handleSubmit } = useForm<ReviewForm>();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onSubmit: SubmitHandler<ReviewForm> = (formData) => {
    reviewObj.text = formData.text;
    reviewObj = { content: 5, teaching: 4, workload: 4, text: "adlv" };
    console.log(typeof reviewObj);

    api
      .post(`/communities/${courseId}/ratings`, reviewObj)
      .then((response) => {
        console.log(response.data);
        navigate(`/course/${courseId}`);
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
        <Typography sx={{ fontWeight: "bold" }}>Course Content</Typography>
        <StyledRatingContent
          name="customized-color"
          value={ratingContent}
          getLabelText={(ratingContent: number) =>
            `${ratingContent} Heart${ratingContent !== 1 ? "s" : ""}`
          }
          precision={1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          onChange={(event, newValueContent) => {
            newValueContent = newValueContent ? newValueContent : 0;
            setRatingContent(newValueContent);
          }}
        />
        <Typography sx={{ fontWeight: "bold" }}>Teaching</Typography>
        <StyledRatingTeaching
          name="highlight-selected-only"
          value={ratingTeaching}
          IconContainerComponent={IconContainer}
          getLabelText={(value: number) => customIconsTeaching[value].label}
          highlightSelectedOnly
          onChange={(event, newValueTeaching) => {
            newValueTeaching = newValueTeaching ? newValueTeaching : 0;
            setRatingTeaching(newValueTeaching);
          }}
        />
        <Typography sx={{ fontWeight: "bold" }}>Workload</Typography>

        <Rating
          name="simple-controlled"
          value={ratingWorkload}
          onChange={(event, newValueWorkload) => {
            newValueWorkload = newValueWorkload ? newValueWorkload : 0;
            setRatingWorkload(newValueWorkload);
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
        <Button variant="contained" type="submit">
          SUBMIT
        </Button>
      </form>
    </Paper>
  );
};

export default CourseReviewForm;
