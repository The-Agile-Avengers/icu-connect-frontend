import React from "react";
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

/* ToDo: Delete Mockup Data */
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const userExample: UserModel = {
  id: 1,
  name: "Test User",
  email: "testUser@uzh.ch",
  avatar: imgLink,
};

type CommunityPageParams = {
  id: string;
};

const Community: React.FC = () => {
  const { id } = useParams<CommunityPageParams>();

  return id ? (
    <Layout>
      <Accordion sx={{ bgcolor: "secondary.main", p: 3, mb: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h1" sx={{ mb: 0 }}>
            Advanced Software Engineering (L+E)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommunityInfo />
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
          <CommunityPostForm courseId={id}/>
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
          <CommunityRatingForm courseId={id} />
        </Box>
      </Box>
    </Layout>
  ) : (
    <Layout>
      <CommunityForm />
    </Layout>
  );
};

export default Community;
