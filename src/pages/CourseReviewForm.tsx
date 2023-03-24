import React from "react";
import Box from "@mui/material/Box";
import { BoxTitle, PageTitle } from "../design/typography";
import Navbar from "../components/Navbar/Navbar";
import { Grid, IconButton, IconContainerProps, Paper, Rating, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../utils/api";

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIconsTeaching[value].icon}</span>;
}

const StyledRatingTeaching = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
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
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

const StyledRatingWorkload = styled(Rating)(() => ({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
}));

type ReviewForm = {
    ratingContent: number;
    ratingTeaching:number;
    ratingWorkload: number;
  };





export default function CourseReviewForm() {
  const [ratingContent, setRatingContent] = React.useState<number>(3);
  const [ratingTeaching, setRatingTeaching] = React.useState<number>(3);
  const [ratingWorkload, setRatingWorkload] = React.useState<number>(3);  

  const params = useParams();
  const communityId = params.id
  console.log(params.id);

  const navigate = useNavigate();
  function handleClick() {
    navigate('/coursePage/'+communityId);
  }

  const { handleSubmit } = useForm<ReviewForm>({
    mode: "onChange",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSubmit: SubmitHandler<ReviewForm> = (formData) => {
    console.log(formData);
    api
      .post("/communities/"+{communityId}+"/ratings", formData)
      .then((response) => {
        console.log(response.data);
        navigate("/coursePage"+{communityId});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout title="Course Page: Advanced Software Systems">
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
              <Box sx={{ gridArea: "info" }}>
                <IconButton aria-label="delete" onClick={handleClick}>
                  <ArrowBackIosIcon />
                </IconButton>
                <BoxTitle title=" New Review" />
                <div style={{ padding: 14 }}>
                  <Paper style={{ padding: " 20px" }}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <div style={{ display: "block" }}>
                          <p>Please rate the course: </p>
                          <Typography component="legend">
                            <b>Course Content</b>
                          </Typography>
                          <StyledRatingWorkload
                            name="customized-color"
                            value={ratingContent}
                            getLabelText={(ratingContent: number) =>
                              `${ratingContent} Heart${
                                ratingContent !== 1 ? "s" : ""
                              }`
                            }
                            precision={1}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={
                              <FavoriteBorderIcon fontSize="inherit" />
                            }
                            onChange={(event, newValueContent) => {
                              newValueContent = newValueContent
                                ? newValueContent
                                : 0;
                              setRatingContent(newValueContent);
                            }}
                          />

                          <Typography component="legend">
                            <b>Teaching</b>
                          </Typography>
                          <StyledRatingTeaching
                            name="highlight-selected-only"
                            value={ratingTeaching}
                            IconContainerComponent={IconContainer}
                            getLabelText={(value: number) =>
                              customIconsTeaching[value].label
                            }
                            highlightSelectedOnly
                            onChange={(event, newValueTeaching) => {
                              newValueTeaching = newValueTeaching
                                ? newValueTeaching
                                : 0;
                              setRatingTeaching(newValueTeaching);
                            }}
                          />
                            <Typography component="legend"><b>Workload</b></Typography>

                            <Rating
                              name="simple-controlled"
                              value={ratingWorkload}
                              onChange={(event, newValueWorkload) => {
                                newValueWorkload = newValueWorkload
                                  ? newValueWorkload
                                  : 0;
                                setRatingWorkload(newValueWorkload);
                              }}
                            />
                            <TextField
                              id="outlined-multiline-static"
                              label="Text Review"
                              multiline
                              rows={4}
                            />
                          </div>
                        <Button 
                        variant="contained"
                        onSubmit={handleSubmit(onSubmit)}
                         >SUBMIT</Button>
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
