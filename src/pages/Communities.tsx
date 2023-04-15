import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import SearchBar from "../components/SearchBar";
import { CommunityModel } from "../models/CommunityModel";
import axios from "axios";
import { api } from "../utils/api";
import CommunityBox from "../components/course/CommunityBox";
import Box from "@mui/material/Box/Box";

const Communities: React.FC = () => {
  const [communities, setCommunities] = useState<CommunityModel[]>([]);
  const boxWidthPercentage = 29;

  type ApiResponse = {
    content: CommunityModel[];
  };

  async function getCommunities(search?: string) {
    try {
      const searchParam: string = search ? "&search=" + search : "";
      const { data } = await api.get<ApiResponse>(
        "communities?page=0&size=20" + searchParam
      );
      setCommunities(data.content);

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
    void getCommunities();
  }, []);

  return (
    <Layout title="Communities">
      {" "}
      <SearchBar
        placeholder="Search by moduleId, insturctor or module name"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          void getCommunities(event.target.value)
        }
        width={
          Math.floor(100 / boxWidthPercentage) * boxWidthPercentage +
          (Math.floor(100 / boxWidthPercentage) - 1) * 4
        }
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "3em", mt: "2em" }}>
        {communities.map((community, i: number) => (
          <CommunityBox
            key={`B${i * Math.random()}`}
            community={community}
            boxWidth={boxWidthPercentage}
          />
        ))}
      </Box>
      {communities.length === 0 ? "No communities found..." : ""}
    </Layout>
  );
};

export default Communities;
