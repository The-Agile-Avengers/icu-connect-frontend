import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Layout from "components/shared/Layout";
import React from "react";
import avatar1 from "images/Avatars/avatar1.png";
import avatar2 from "images/Avatars/avatar2.png";
import avatar3 from "images/Avatars/avatar3.png";
import avatar4 from "images/Avatars/avatar4.png";
import avatar5 from "images/Avatars/avatar5.png";
import avatar6 from "images/Avatars/avatar6.png";
import avatar7 from "images/Avatars/avatar7.png";
import avatar8 from "images/Avatars/avatar8.png";
import avatar9 from "images/Avatars/avatar9.png";
import avatar10 from "images/Avatars/avatar10.png";
import { Edit } from "@mui/icons-material";

function getAvatar(index: number): string {
  const avatarList = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
  ];
  return avatarList[index - 1];
}

export default function Settings() {
  return (
    <Layout title="My Settings">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        alignContent="center"
      >
        <Grid item>
          <Avatar src={getAvatar(10)} sx={{ width: 200, height: 200 }} />
        </Grid>
        <Grid item width="60%" maxWidth="300">
          <List>
            <ListItem>
              <ListItem>
                <Typography variant="h6"> Name: </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h6"> Marinja </Typography>
              </ListItem>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItem>
                <Typography variant="h6"> Email: </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h6"> Marinja </Typography>
              </ListItem>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItem>
                <Typography variant="h6"> Study Area </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h6"> Marinja </Typography>
              </ListItem>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
}
