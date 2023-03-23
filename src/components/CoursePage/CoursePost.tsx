import React from "react";
import { Divider, Typography } from "@mui/material";
import Post from "./Post";
import { UserModel } from "../../Models/UserModel";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const userExample: UserModel = {
  id: 1,
  name: "Test User",
  email: "testUser@uzh.ch",
  avatar: imgLink,
};

export default function CoursePost() {
  return (
    <div style={{ padding: 14 }}>
      <Typography color="#21B34B"> 2023 </Typography>
      <Post
        account={userExample}
        title="I have a question"
        postText="This is my question"
        time="6 minutes"
      />
      <Post
        account={userExample}
        title="I have a question"
        postText="This is my question"
        time="6 minutes"
      />
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      <Typography color="#21B34B"> 2022 </Typography>
      <Post
        account={userExample}
        title="I have my first question"
        postText="This is my question"
        time="14 minutes"
      />
    </div>
  );
}
