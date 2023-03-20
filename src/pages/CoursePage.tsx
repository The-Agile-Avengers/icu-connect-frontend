import React from "react";
import Box from "@mui/material/Box";
import { BoxTitle, PageTitle } from "../design/typography";
import Navbar from "../components/Navbar/Navbar";
import Layout from "../components/shared/Layout";
import CourseInfo from "../components/CourseInfo";
import CoursePost from "../components/CoursePost";
import AddCommentIcon from '@mui/icons-material/AddComment';
import BasicSpeedDial from "../components/BasicSpeedDial";
import Reviews from "../components/Reviews";

export default function CoursePage() {
  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 4, heigth: "100%" }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              color: "#fff",
              "& > .MuiBox-root > .MuiBox-root": {
                p: 1,
                borderRadius: 2,
                fontSize: "0.875rem",
                fontWeight: "700",
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1,
                gridTemplateRows: "auto",
                gridTemplateAreas: `"header header"
              "info posts"
              "reviews posts"`,
              }}
            >
              <Box sx={{ gridArea: "header" }}>
                <PageTitle title="Course Page" />
              </Box>
              
              <Box sx={{ gridArea: "info" }}>
                <BoxTitle title="Info" />
                <Box sx={{ bgcolor: "secondary.main" }}>.
                  <CourseInfo/>
                </Box>{" "}
              </Box>
              <Box sx={{ gridArea: "posts" }}>
                <Box display= "inline-block">
                  <BoxTitle title="Posts" />
                </Box>
                <Box sx={{ bgcolor: "secondary.main" }}>
                  <CoursePost />
                </Box>{" "}
              </Box>
              <Box sx={{ gridArea: "reviews" }}>
                <BoxTitle title="Reviews" />
                <Box sx={{ bgcolor: "secondary.main" }}>
                  <Reviews/>
                </Box>{" "}
              </Box>
              <Box color="#21B34B" position="absolute" bottom="15px" right="15px">
                <BasicSpeedDial/>
              </Box>{" "}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
