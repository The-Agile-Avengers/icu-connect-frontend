import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import SearchBar from "../components/SearchBar";
import { CommunityModel } from "../models/CommunityModel";
import axios from "axios";
import { api } from "../utils/api";
import CommunityBox from "../components/course/MyCommunityBox";
import Box from "@mui/material/Box/Box";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [communities, setCommunities] = useState<CommunityModel[]>([]);

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

  const handleClick = () => {
    void getCommunities(searchQuery);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCommunities();
  }, []);

  return (
    <Layout title="Search">
      {" "}
      <SearchBar //TODO - abstract into own component?
        placeholder="Search by moduleId, insturctor or module name"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(event.target.value)
        }
        onClick={handleClick}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {communities.map((community, i: number) => (
          <CommunityBox key={`B${i * Math.random()}`} community={community} />
        ))}
      </Box>
      {communities.length === 0
        ? "You haven't joined any communites yet..."
        : ""}
    </Layout>
  );
};

export default Search;
