import React from "react";
import ReactDOM from "react-dom";

import { Avatar, Divider, Grid, Paper } from "@mui/material";
import Post from "./CoursePage/Post";
import { UserModel } from "../Models/UserModel";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const userExample: UserModel={
  id:1,
  name:"Test User",
  email:"testUser@uzh.ch",
  avatar: imgLink
}





export default function CoursePost() {
  return (
    <div style={{ padding: 14 }}>
      <Paper style={{ padding: "40px 20px" }}>
        <Post
          account= {userExample}
          title="I have a question"
          postText="This is my question"
          time="6 minutes"

        />
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <Post
          account= {userExample}
          title="I have my first question"
          postText="This is my question"
          time="14 minutes"/>
      </Paper>
    </div>
  );
}


