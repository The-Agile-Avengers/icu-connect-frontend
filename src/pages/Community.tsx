/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
import Box from "../components/shared/Box";
import Layout from "../components/shared/Layout";
import CommunityInfo from "../components/course/CommunityInfo";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserModel } from "../models/UserModel";
import CommunityPost from "../components/course/post/CommunityPost";
import CommunityRating from "../components/course/rating/CommunityRating";
import CommunityPostForm from "../components/course/post/CommunityPostForm";
import CommunityRatingForm from "../components/course/rating/CommunityRatingForm";
import { CommunityModel } from "../models/CommunityModel";
import { api } from "../utils/api";
import axios from "axios";
import CommunityCreate from "../components/course/CommunityCreate";
import { Rating } from "../utils/types";

/* TODO - Delete Mockup Data */
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const userExample: UserModel = {
  id: 1,
  name: "Test User",
  email: "testUser@uzh.ch",
  avatar: imgLink,
};

const defaultCommunity = {
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
  joined: false,
};

type CommunityPageParams = {
  id: string;
};

interface RatingsResponse {
  content: Rating[];
}

const Community: React.FC = () => {
  const { id } = useParams<CommunityPageParams>() || "";
  const [error, setError] = useState<number>(1);
  const [communityInfo, setCommunityInfo] =
    useState<CommunityModel>(defaultCommunity);
  const [communityRatings, setCommunityRatings] = useState<Rating[]>([]);

  const addCommunityRating = (rating: Rating) => {
    setCommunityRatings([...communityRatings, rating]);
  };

  async function getCommunityRatings() {
    if (id) {
      try {
        const { data } = await api.get<RatingsResponse>(
          `/communities/${id}/ratings?page=0&size=100`
        );

        setCommunityRatings(data.content);
        setError(0);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          if (error.response?.status === 404) {
            setError(404);
          }
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    }
  }

  async function getCommunity() {
    if (id) {
      try {
        const { data } = await api.get<CommunityModel>(`/communities/${id}`);
        setCommunityInfo(data);
        setError(0);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          if (error.response?.status === 404) {
            setError(404);
          }
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    }
  }

  useEffect(() => {
    getCommunity();
    getCommunityRatings();
  }, [id]);

  return error === 0 && id ? (
    <Layout>
      <Accordion sx={{ bgcolor: "secondary.main", p: 3, mb: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h1" sx={{ mb: 0 }}>
            {communityInfo ? communityInfo.name : "loading"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommunityInfo community={communityInfo} />
        </AccordionDetails>
      </Accordion>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box
          title="Posts"
          sx={{
            bgcolor: "secondary.main",
            p: 3,
            flex: "1 0 500px",
          }}
        >
          {Array(3)
            .fill(1)
            .map((i: number) => (
              <CommunityPost
                key={`A${i * Math.random()}`}
                account={userExample}
                title="I have a question"
                postText="This is my question"
                time="6 minutes"
              />
            ))}
          <CommunityPostForm courseId={id || ""} />
        </Box>
        <Box
          title="Ratings"
          sx={{ bgcolor: "secondary.main", p: 3, flex: "1 0 500px" }}
        >
          {communityRatings.map((rating: Rating) => (
            <CommunityRating
              key={rating.id}
              user={{
                id: 123,
                name: "WaitingForBackend",
                email: "ToDo@waitingforbackend.ch",
                avatar: imgLink,
              }}
              ratingContent={rating.content}
              ratingTeaching={rating.teaching}
              ratingWorkload={rating.workload}
              textRating={rating.text}
              time="22.3.2023"
            />
          ))}
          <CommunityRatingForm
            id={id}
            addCommunityRating={addCommunityRating}
          />
        </Box>
      </Box>
    </Layout>
  ) : error === 404 ? (
    <Layout>
      <CommunityCreate />
    </Layout>
  ) : (
    <Layout> {"loading..."} </Layout>
  );
};

export default Community;
