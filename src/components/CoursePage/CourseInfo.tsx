import * as React from "react";
import Box from "@mui/material/Box";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../utils/api";

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

const StyledRatingWorkload = styled(Rating)(() => ({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
}));

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIconsTeaching[value].icon}</span>;
}

type GetInfoResponse = {
  content: Content[];
};

type Content = {
  id: number;
  moduleId: string;
  name: string;
  instructor: Instructor;
  subscribersCount: number;
  rating: Rating;
};

type Instructor = {
  id: number;
  name: string;
};

type Rating = {
  id: number;
  teaching: number;
  content: number;
  workload: number;
};

const DefaultContent = {
  id: 0,
  moduleId: "",
  name: "",
  instructor: {
    id: 0,
    name: "",
  },
  subscribersCount: 0,
  rating: {
    id: 0,
    teaching: 1,
    content: 1,
    workload: 1,
  },
};

export default function CourseInfo() {
  const [content, setContent] = useState<Content>(DefaultContent);
  const [valueContent] = useState<number>(content.rating.content);
  const [valueTeaching] = useState<number>(content.rating.teaching);
  const [valueWorkload] = useState<number>(content.rating.workload);

  async function getInfo() {
    try {
      // 👇️ const data: GetInfoResponse
      const { data, status } = await api.get<GetInfoResponse>(
        "/communities?page=0&size=5" //TODO - get data via module_id from url when implemented in BE
      );

      console.log(JSON.stringify(data.content[0], null, 4));

      setContent(data.content[0]);

      // 👇️ "response status is: 200"
      console.log("response status is: ", status);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getInfo();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [content]);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        color: "#000000",
      }}
    >
      <Typography component="legend">
        <b>Course Name: </b>
        {content.name}
      </Typography>
      <Typography component="legend">
        <b>Number: </b> {content.moduleId}
      </Typography>
      <Typography component="legend">
        <b>Teacher: </b> {content.instructor.name}
      </Typography>
      <Typography component="legend">
        <b>Course Content</b>
      </Typography>
      <StyledRatingWorkload
        name="customized-color"
        value={valueContent}
        getLabelText={(value: number) =>
          `${value} Heart${value !== 1 ? "s" : ""}`
        }
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        readOnly
      />

      <Typography component="legend">
        <b>Teaching</b>
      </Typography>
      <StyledRatingTeaching
        name="highlight-selected-only"
        value={valueTeaching}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIconsTeaching[value].label}
        highlightSelectedOnly
        readOnly
      />
      <Typography component="legend">
        <b>Workload</b>
      </Typography>
      <Rating name="simple-controlled" value={valueWorkload} readOnly />
    </Box>
  );
}
