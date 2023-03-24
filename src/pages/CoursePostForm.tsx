import React from "react";
import Box from "@mui/material/Box";
import { BoxTitle, PageTitle } from "../design/typography";
import Navbar from "../components/Navbar/Navbar";
import Layout from "../components/shared/Layout";
import { Grid, IconButton, IconContainerProps, Paper, Rating, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";


function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIconsTeaching[value].icon}</span>;
}
   
const StyledRatingTeaching = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
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
          label: 'Very Dissatisfied',
        },
        2: {
          icon: <SentimentDissatisfiedIcon color="error" />,
          label: 'Dissatisfied',
        },
        3: {
          icon: <SentimentSatisfiedIcon color="warning" />,
          label: 'Neutral',
        },
        4: {
          icon: <SentimentSatisfiedAltIcon color="success" />,
          label: 'Satisfied',
        },
        5: {
          icon: <SentimentVerySatisfiedIcon color="success" />,
          label: 'Very Satisfied',
        },
      };
      
const StyledRatingWorkload = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
}));

export default function CourseReviewForm() {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/coursePage');
  }
    

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
                <PageTitle title="Course Page: Advanced Software Systems" />
              </Box>
              
              <Box sx={{ gridArea: "info" }}>
                <IconButton aria-label="back" onClick={handleClick}>
                  <ArrowBackIosIcon />
                </IconButton>
                <BoxTitle title=" New Post" />
                <div style={{ padding: 14 }}>
                  <Paper style={{ padding: " 20px" }}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid justifyContent="left" item xs zeroMinWidth >
                        <div style={{display: "block"}}>
                          <p>Enter the Post Title: </p>
                          <TextField id="standard-basic" label="Standard" variant="standard" />
                          <p>Your Post: </p>
                          <TextField
                            id="outlined-multiline-static"
                            label="Text Review"
                            multiline
                            rows={4}
                          />
                        </div>
                        <Button variant="contained" >POST</Button>
                        
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
