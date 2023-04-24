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
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommunityPost from "../components/course/post/CommunityPost";
import CommunityRating from "../components/course/rating/CommunityRating";
import CommunityPostForm from "../components/course/post/CommunityPostForm";
import CommunityRatingForm from "../components/course/rating/CommunityRatingForm";
import { CommunityModel } from "../models/CommunityModel";
import { api } from "../utils/api";
import axios from "axios";
import CreateCommunityForm from "../components/course/CreateCommunityForm";
import { Rating, Post } from "../utils/types";
import { getDate } from "utils/utils";

/* TODO - Delete Mockup Data */
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

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
interface PostsResponse {
  content: Post[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Community: React.FC = () => {
  const { id } = useParams<CommunityPageParams>() || "";
  const [error, setError] = useState<number>(1);
  const [communityInfo, setCommunityInfo] =
    useState<CommunityModel>(defaultCommunity);
  const [communityRatings, setCommunityRatings] = useState<Rating[]>([]);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);

  const addCommunityRating = (rating: Rating) => {
    setCommunityRatings([...communityRatings, rating]);
  };
  const addCommunityPost = (post: Post) => {
    setCommunityPosts([post, ...communityPosts]);
  };

  const deleteCommunityPost = (postId: number) => {
    const postIndex = communityPosts.findIndex((post) => post.id === postId);
    if (postIndex > -1) {
      const updatedList = [...communityPosts];
      updatedList.splice(postIndex, 1);
      setCommunityPosts(updatedList);
    }
  };

  /* Tab Navigation Logic */
  const [activeTab, setActiveTab] = React.useState(0);
  const [expandCommunityInfo, setExpandCommunityInfo] = React.useState<
    boolean | null
  >(null);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        sx={{ width: "100%" }}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    );
  }

  async function joinLeaveCommunity() {
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { data } = await api.put<CommunityModel>(
        `/users/communities/${id}`
      );
      /* ToDo: Backend is sending inconsistent responses
      i.e. if user joins the course, data be a fully loaded CommunityModel
           if user leaves the course, data will be null instead of fully loaded CommunityModel
      */
      setCommunityInfo({ ...communityInfo, joined: !communityInfo.joined });
      setActiveTab(communityInfo.joined ? 1 : 0);
      setExpandCommunityInfo(!expandCommunityInfo);
    }
  }

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
  async function getCommunityPosts() {
    if (id) {
      try {
        const { data } = await api.get<PostsResponse>(
          `/communities/${id}/posts?page=0&size=100`
        );
        console.log("data", data.content);
        setCommunityPosts(data.content.reverse());
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
        setExpandCommunityInfo(!data.joined);
        setActiveTab(data.joined ? 0 : 1);
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
    getCommunityPosts();
  }, [id]);

  return error === 0 && id ? (
    <Layout>
      <Accordion
        expanded={expandCommunityInfo ?? !communityInfo.joined}
        sx={{ bgcolor: "secondary.main", p: 3, mb: 3 }}
        onChange={() => setExpandCommunityInfo(!expandCommunityInfo)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              pr: 3,
            }}
          >
            <Typography variant="h1" sx={{ mb: 0 }}>
              {communityInfo.name}
            </Typography>
            <Button
              variant={communityInfo.joined ? "outlined" : "contained"}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={joinLeaveCommunity}
            >
              {communityInfo.joined ? "Leave" : "Join"}
            </Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <CommunityInfo community={communityInfo} />
        </AccordionDetails>
      </Accordion>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          bgcolor: "secondary.main",
          width: "100%",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Posts" sx={{ p: 3 }} />
            <Tab label="Ratings" sx={{ p: 3 }} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Box sx={{ width: "100%", alignItems: "stretch" }}>
            <CommunityPostForm id={id} addCommunityPost={addCommunityPost} />
            {communityPosts.map((post: Post) => (
              <CommunityPost
                key={post.id}
                communityId={id}
                postId={post.id}
                user={{
                  id: 123,
                  //TODO - fix eslint
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  username: post.user.username,
                  email: "",
                  avatar: imgLink,
                }}
                title={post.title}
                postText={post.text}
                commentList={post.commentList}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                time={getDate(post.creation)}
                deleteCommunityPost={deleteCommunityPost}
              />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ width: "100%", alignItems: "stretch" }}>
            <CommunityRatingForm
              id={id}
              addCommunityRating={addCommunityRating}
            />
            {communityRatings.map((rating: Rating) => (
              <CommunityRating
                key={rating.id}
                user={{
                  id: 123,
                  username: "WaitingForBackend",
                  email: "ToDo@waitingforbackend.ch",
                  avatar: imgLink,
                }}
                ratingContent={rating.content}
                ratingTeaching={rating.teaching}
                ratingWorkload={rating.workload}
                textRating={rating.text}
                //TODO adjust time variable to the timestemp
                time="22.3.2023"
              />
            ))}
          </Box>
        </TabPanel>
      </Box>
    </Layout>
  ) : error === 404 ? (
    <Layout title="Create a new Course">
      <CreateCommunityForm />
    </Layout>
  ) : (
    <Layout> {"loading..."} </Layout>
  );
};

export default Community;
