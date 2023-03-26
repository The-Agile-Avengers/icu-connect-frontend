import React from "react";
import Box from "../components/shared/Box";
import Layout from "../components/shared/Layout";
import CourseInfo from "../components/course/CourseInfo";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserModel } from "../Models/UserModel";
import CoursePost from "../components/course/post/CoursePost";
import CourseReview from "../components/course/review/CourseReview";
import CourseForm from "../components/course/CourseForm";
import CoursePostForm from "../components/course/post/CoursePostForm";
import CourseReviewForm from "../components/course/review/CourseReviewForm";

/* ToDo: Delete Mockup Data */
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const userExample: UserModel = {
  id: 1,
  name: "Test User",
  email: "testUser@uzh.ch",
  avatar: imgLink,
};

type CoursePageParams = {
  id: string;
};

const CoursePage: React.FC = () => {
  const { id } = useParams<CoursePageParams>();

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
          <CourseInfo />
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
              <CoursePost
                key={i}
                account={userExample}
                title="I have a question"
                postText="This is my question"
                time="6 minutes"
              />
            ))}
          <CoursePostForm />
        </Box>
        <Box
          title="Reviews"
          sx={{ bgcolor: "secondary.main", p: 3, flex: "1 0 500px" }}
        >
          {Array(3)
            .fill(1)
            .map((i: number) => (
              <CourseReview
                key={i}
                account={userExample}
                ratingContent={5}
                ratingTeaching={2}
                ratingWorkload={4}
                textRating="I did like to course, but it was a difficult course."
                time="22.3.2023"
              />
            ))}
          <CourseReviewForm />
        </Box>
      </Box>
    </Layout>
  ) : (
    <Layout>
      <CourseForm />
    </Layout>
  );
};

export default CoursePage;
