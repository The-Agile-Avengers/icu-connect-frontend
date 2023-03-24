import React from "react";

import { Avatar, Grid, IconContainerProps, Paper, Rating, Typography } from "@mui/material";
import { UserModel } from "../../Models/UserModel";
import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export interface ReviewValues {
    account: UserModel,
    ratingContent: number,
    ratingTeaching: number,
    ratingWorkload: number,
    textRating: string,
    time: string
}
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


export default function ReviewItem({account, ratingContent, ratingTeaching, ratingWorkload, textRating, time}:ReviewValues) {
  return (
    <div style={{ padding: 14 }}>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={account.avatar} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <div style={{display:"flex", justifyContent : "space-between" }}>
              <div style={{display:"block" }}>
                <Typography component="legend" ><b>Course Content</b></Typography>
                <StyledRatingWorkload
                  name="customized-color"
                  value={ratingContent}
                  getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  readOnly
                />
              </div>
              
              <div style={{display:"block" }}> 
                <Typography component="legend"><b>Teaching</b></Typography>
                <StyledRatingTeaching
                  name="highlight-selected-only"
                  value={ratingTeaching}
                  IconContainerComponent={IconContainer}
                  getLabelText={(value: number) => customIconsTeaching[value].label}
                  highlightSelectedOnly
                  readOnly
                />
              </div>
              <div style={{display:"block" }}>
                <Typography component="legend"><b>Workload</b></Typography>
                <Rating
                  name="simple-controlled"
                  value={ratingWorkload}
                  readOnly
                />
              </div>
            </div>
            <p style={{ textAlign: "left" }}>
              {textRating}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              Review: {time}
            </p> 
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


