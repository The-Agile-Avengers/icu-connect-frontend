import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../components/shared/Layout";
import axios from "axios";
import { api } from "../utils/api";
import { CommunityModel, parser } from "../Models/CommunityModel";

const MyCommunities: React.FC = () => {
  const [content, setContent] = useState<CommunityModel>();

  async function getJoinedCommunities() {
    try {
      const { data, status } = await api.get<CommunityModel>(
        "/communities?page=0&size=5" //TODO - change
      );

      console.log(JSON.stringify(data, null, 4));

      setContent(parser(data));

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

  return <Layout title="Future My Course Communities">dd</Layout>;
};

export default MyCommunities;
