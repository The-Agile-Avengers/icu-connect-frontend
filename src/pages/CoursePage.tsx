import React from "react";
import Box from '@mui/material/Box';
import { BoxTitle, PageTitle } from "../design/typography";

const dummyText = (
  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
)

export default function CoursePage() {
    return (
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 4, heigth: '100%'}}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              color: '#fff',
              '& > .MuiBox-root > .MuiBox-root': {
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `"header header"
              "info posts"
              "reviews posts"`,
              }}
            >
              <Box sx={{ gridArea: 'header'}}>
                <PageTitle title='Course Page'/>
              </Box>
              <Box sx={{ gridArea: 'info'}}>
                <BoxTitle title='Info'/>
                <Box sx={{bgcolor: 'secondary.main'}}>.</Box> {//TODO - Replace with Info-Box Component
                }
              </Box>
              <Box sx={{ gridArea: 'posts'}}>
                <BoxTitle title='Posts'/>
                <Box sx={{bgcolor: 'secondary.main'}}>.</Box> {//TODO - Replace with Posts Component
                }
              </Box>
              <Box sx={{ gridArea: 'reviews'}}>
                <BoxTitle title='Reviews'/>
                <Box sx={{bgcolor: 'secondary.main'}}>.</Box> {//TODO - Replace with Reviews Component
                }
              </Box>
            </Box>
          </Box>
      </Box>
    );
  }