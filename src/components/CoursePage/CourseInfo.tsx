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

type IInfo = {
  content: any;
  pageable: any;
};

type GetInfoResponse = {
  data: IInfo[];
};

export default function CourseInfo() {
  const [valueContent] = useState<number | null>(3);
  const [valueTeaching] = useState<number | null>(4);
  const [valueWorkload] = useState<number | null>(5);
  /*const [info, setInfo] = useState<IInfo[] | null>;*/
  const courseName = "Advanced Software Engineering (L+E)";
  const courseNumber = "03SM22MI0026";
  const ects = 6;
  const teacher = "Harald Gall";
  const description =
    "This course has the goal of deepening the knowledge about advanced software engineering practices. The lectures will be complemented by a software project developed in teams. The teams will work by applying most of the software engineering processes presented within the lectures. At the end of the course, the teams will present their project.";

  async function getInfo() {
    try {
      // 👇️ const data: GetInfoResponse
      const { data, status } = await api.get<GetInfoResponse>("/communities");

      console.log(JSON.stringify(data, null, 4));

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
  });

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        color: "#000000",
      }}
    >
      <Typography component="legend">
        <b>Course Name: </b>
        {courseName}
      </Typography>
      <Typography component="legend">
        <b>Number: </b> {courseNumber}
      </Typography>
      <Typography component="legend">
        <b>ECTS: </b> {ects}
      </Typography>
      <Typography component="legend">
        <b>Teacher: </b> {teacher}
      </Typography>
      <Typography component="legend">
        <b>Description:</b> {description}
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
