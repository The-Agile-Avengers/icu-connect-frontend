import React from "react";
import Box from '@mui/material/Box';
import {PageTitle } from "../design/typography";

const dummyText = (
  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
)

export default function TemplatePage() {
    return (
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 4, heigth: '100%'}}
        >
          <Box sx={{ gridArea: 'header'}}>
              <PageTitle title='Template Page'/>
          </Box>
        </Box>
    );
  }