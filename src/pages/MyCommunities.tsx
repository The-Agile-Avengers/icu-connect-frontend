import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import axios from "axios";
import { api } from "../utils/api";
import { CommunityModel } from "../utils/types";
import CommunityBox from "../components/course/CommunityBox";
import Box from "@mui/material/Box/Box";

// In the MY Community page, the user can find all joined communities
const MyCommunities: React.FC = () => {
  const [communities, setCommunities] = useState<CommunityModel[]>([]);

  async function getJoinedCommunities() {
    try {
      const { data } = await api.get<CommunityModel[]>("users/communities");

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

  // Runs if the page is  loaded
  useEffect(() => {
    void getJoinedCommunities();
  }, []);

  return (
    <Layout title="My Communities">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "3em" }}>
        {communities.map((community, i: number) => (
          <CommunityBox
            key={`B${i * Math.random()}`}
            community={community}
            boxWidth={29}
          />
        ))}
      </Box>
      {communities.length === 0
        ? "You haven't joined any communites yet..."
        : ""}
    </Layout>
  );
};

export default MyCommunities;
