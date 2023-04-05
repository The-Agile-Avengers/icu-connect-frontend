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
import { UserModel } from "../Models/UserModel";
import CommunityPost from "../components/course/post/CommunityPost";
import CommunityRating from "../components/course/rating/CommunityRating";
import CommunityForm from "../components/course/CommunityForm";
import CommunityPostForm from "../components/course/post/CommunityPostForm";
import CommunityRatingForm from "../components/course/rating/CommunityRatingForm";
import { CommunityModel, parser } from "../Models/CommunityModel";
import { api } from "../utils/api";
import axios from "axios";

/* ToDo: Delete Mockup Data */
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const userExample: UserModel = {
  id: 1,
  name: "Test User",
  email: "testUser@uzh.ch",
  avatar: imgLink,
};

const DefaultCommunity = {
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

const Community: React.FC = () => {
  const { id } = useParams<CommunityPageParams>() || "";
  const [error, setError] = useState<number>(1);
  const [data, setData] = useState<CommunityModel>(DefaultCommunity);

  async function getCommunity() {
    if (id) {
      try {
        const { data } = await api.get<CommunityModel>(`/communities/${id}`);

        console.log(JSON.stringify(data, null, 4));
        setData(parser(data));
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCommunity();
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
            {data ? data.name : "loading"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommunityInfo community={data} />
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
          {Array(3)
            .fill(1)
            .map((i: number) => (
              <CommunityRating
                key={`B${i * Math.random()}`}
                account={userExample}
                ratingContent={5}
                ratingTeaching={2}
                ratingWorkload={4}
                textRating="I did like the course, but it was a difficult course."
                time="22.3.2023"
              />
            ))}
          <CommunityRatingForm id={id ? id : "loading..."} />
        </Box>
      </Box>
    </Layout>
  ) : error === 404 ? (
    <Layout>
      <CommunityForm /> {/*TODO - redirect to create new course*/}
    </Layout>
  ) : (
    <Layout> {"loading..."} </Layout>
  );
};

export default Community;
