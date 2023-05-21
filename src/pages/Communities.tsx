import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import SearchBar from "../components/SearchBar";
import { CommunityModel } from "../utils/types";
import axios from "axios";
import { api } from "../utils/api";
import CommunityBox from "../components/course/CommunityBox";
import Box from "@mui/material/Box/Box";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// This page represents the community page, where all the different communities can be found via the search bar
// If no community can be found the user can create a new community and will be redirected to the CreateCommunity page
const Communities: React.FC = () => {
  const [communities, setCommunities] = useState<CommunityModel[]>([]);
  const boxWidthPercentage = 29;
  const navigate = useNavigate();

  type ApiResponse = {
    content: CommunityModel[];
  };

  // Get all communities with a specific search string
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

  // Will run when the page is loaded
  useEffect(() => {
    void getCommunities();
  }, []);

  // Redirect to the create page
  function goToCreateCommunity(): void {
    navigate(`/community/create`);
  }

  return (
    <Layout
      title="Communities"
      button={
        <Button variant="contained" onClick={goToCreateCommunity}>
          Create
        </Button>
      }
    >
      {" "}
      <SearchBar
        placeholder="Search by moduleId, insturctor or module name"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          void getCommunities(event.target.value)
        }
        width={100}
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
      {communities.length === 0 && (
        <Typography>
          No communities found. Do you want to create a new one?{" "}
          <Button variant="contained" onClick={goToCreateCommunity}>
            Create
          </Button>
        </Typography>
      )}
    </Layout>
  );
};

export default Communities;
