import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../components/shared/Layout";
import axios from "axios";
import { api } from "../utils/api";
import { CommunityModel } from "../Models/CommunityModel";
import MyCommunityBox from "../components/course/MyCommunityBox";
import Box from "@mui/material/Box/Box";

type ApiResponse = {
  content: CommunityModel;
  status: number;
};

const CommunityExample: CommunityModel = {
  moduleId: "UZH123",
  name: "Lecture 1",
  instructor: {
    id: 1,
    name: "Anna King",
  },
  subscribersCount: 0,
  rating: {
    id: 1,
    teaching: 4,
    content: 4,
    workload: 3.090909090909091,
  },
  joined: false,
};

const MyCommunities: React.FC = () => {
  const [communities, setCommunities] = useState<CommunityModel[]>([]);

  async function getJoinedCommunities() {
    try {
      const { data, status } = await api.get<CommunityModel[]>(
        "users/communities"
      );

      console.log("My Communities");
      console.log(JSON.stringify(data, null, 4));

      setCommunities(data);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getJoinedCommunities();
  }, []);

  return (
    <Layout title="My Communities">
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {communities.map((community, i: number) => (
          <MyCommunityBox key={`B${i * Math.random()}`} community={community} />
        ))}
      </Box>
    </Layout>
  );
};

export default MyCommunities;
