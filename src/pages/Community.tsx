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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommunityPost from "../components/course/post/CommunityPost";
import CommunityRating from "../components/course/rating/CommunityRating";
import CommunityPostForm from "../components/course/post/CommunityPostForm";
import CommunityRatingForm from "../components/course/rating/CommunityRatingForm";
import { CommunityModel } from "../utils/types";
import { api } from "../utils/api";
import axios from "axios";
import CreateCommunityForm from "../components/course/CreateCommunityForm";
import { Post, RatingForm, RatingModel } from "../utils/types";
import { getDate } from "utils/utils";

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

const defaultRating = {
  content: 0,
  teaching: 0,
  workload: 0,
  text: null,
};

type CommunityPageParams = {
  id: string;
};

interface RatingsResponse {
  content: RatingModel[];
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
  const [communityRatings, setCommunityRatings] = useState<RatingModel[]>([]);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  const [alignment, setAlignment] = React.useState("most recent");
  const [rating, setRating] = React.useState<RatingForm>(defaultRating);
  const [readOnly, setReadOnly] = React.useState(false);

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const addCommunityRating = (rating: RatingModel) => {
    setCommunityRatings([rating, ...communityRatings]);
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
          `/communities/${id}/ratings?page=0&size=100&sortByMostLiked=${
            alignment === "most liked" ? "true" : "false"
          }`
        );
        console.log("Ratings, ", data);
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

        /* get course rating of user */
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
    if (communityRatings.length === 0) {
      getCommunityRatings();
    }
    if (communityPosts.length === 0) {
      getCommunityPosts();
    }
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

        {/* SECTION - POSTS */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ width: "100%", alignItems: "stretch" }}>
            <CommunityPostForm id={id} addCommunityPost={addCommunityPost} />
            {communityPosts.map((post: Post) => (
              <CommunityPost
                key={post.id}
                communityId={id}
                postId={post.id}
                user={{
                  id: post.user.id,
                  username: post.user.username,
                  email: post.user.email,
                  avatar: post.user.avatar,
                  studyArea: " ",
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
        {/* SECTION - Ratings */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ width: "100%", alignItems: "stretch" }}>
            <CommunityRatingForm
              id={id}
              rating={rating}
              setRating={setRating}
              setReadOnly={setReadOnly}
              readOnly={readOnly}
              addCommunityRating={addCommunityRating}
            />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleToggleChange}
              aria-label="Platform"
              sx={{ mt: "2em" }}
            >
              <ToggleButton value="most recent">most recent</ToggleButton>
              <ToggleButton value="most liked">most liked</ToggleButton>
            </ToggleButtonGroup>
            {communityRatings.map((rating: RatingModel) => (
              <CommunityRating
                rating={rating}
                key={rating.id}
                moduleId={id}
                user={{
                  id: rating.user.id,
                  username: rating.user.username,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  email: rating.user.email,
                  avatar: rating.user.avatar,
                  studyArea: " ",
                }}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                getRatings={getCommunityRatings}
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
