import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../utils/api";
import { Legend } from "../../design/typography";
import HoverRating from "./rating/HoverRating";

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

const defaultRatings = {
  content: 0,
  teaching: 0,
  workload: 0,
};

export default function CommunityInfo() {
  const [content, setContent] = useState<Content>(DefaultContent);
  const [ratings, setRatings] = useState(defaultRatings);

  async function getInfo() {
    try {
      // 👇️ const data: GetInfoResponse
      const { data, status } = await api.get<GetInfoResponse>(
        "/communities?page=0&size=5" //TODO - get data via module_id from url when implemented in BE
      );

      console.log(JSON.stringify(data.content[0], null, 4));

      setContent(data.content[0]);

      const ratings = data.content[0].rating;
      setRatings((prev) => ({
        ...prev,
        content: ratings.content ? ratings.content : 0,
        teaching: ratings.teaching ? ratings.teaching : 0,
        workload: ratings.workload ? ratings.workload : 0,
      }));

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
    <Box>
      <Legend label="Course Name: " value={content.name} />
      <Legend label="Module ID: " value={content.moduleId} />
      <Legend label="Teacher: " value={content.instructor.name} />
      <Legend label="Course Content" />
      <HoverRating value={ratings.content} type="CONTENT" />
      <Legend label="Teaching" />
      <HoverRating value={ratings.teaching} type="TEACHING" />
      <Legend label="Workload" />
      <HoverRating value={ratings.workload} type="WORKLOAD" />
    </Box>
  );
}
