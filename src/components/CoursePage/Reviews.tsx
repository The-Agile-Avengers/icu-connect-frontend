import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ReviewItem from './ReviewItem';
import { UserModel } from '../../Models/UserModel';


/*const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
*/
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const userExample: UserModel={
  id:1,
  name:"Test User",
  email:"testUser@uzh.ch",
  avatar: imgLink
}


export default function Reviews() {
  
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
        color: "#000000",
      }}
    >
      
      <Grid container spacing={2} direction="column">
        <Grid item xs={8}>
          <ReviewItem
            account= {userExample}
            ratingContent={5}
            ratingTeaching={2}
            ratingWorkload={4}
            textRating='I did like to course, but it was a difficult course.'
            time='22.3.2023'
          />
        </Grid>
        <Grid item xs={4}>
          <ReviewItem
            account= {userExample}
            ratingContent={5}
            ratingTeaching={2}
            ratingWorkload={4}
            textRating='I did like to course, but it was a difficult course.'
            time='22.3.2023'
          />
        </Grid>
        <Grid item xs={8}>
          <ReviewItem
            account= {userExample}
            ratingContent={5}
            ratingTeaching={2}
            ratingWorkload={4}
            textRating='I did like to course, but it was a difficult course.'
            time='22.3.2023'
          />
        </Grid>
      </Grid>
    </Box>
  );
}