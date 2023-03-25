import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../utils/api";
import { RatingTeaching, RatingWorkload } from "./RatingIcons";

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
      <RatingWorkload
        value={content.rating.workload === null ? 1 : content.rating.workload}
      />
      <Typography component="legend">
        <b>Teaching</b>
      </Typography>
      <RatingTeaching
        value={content.rating.teaching === null ? 1 : content.rating.teaching}
      />
      <Typography component="legend">
        <b>Workload</b>
      </Typography>
      <Rating
        name="simple-controlled"
        value={content.rating.workload === null ? 1 : content.rating.workload}
        readOnly
      />
    </Box>
  );
}
