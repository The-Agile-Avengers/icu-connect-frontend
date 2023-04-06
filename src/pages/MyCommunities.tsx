import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../components/shared/Layout";
import axios from "axios";
import { api } from "../utils/api";
import { CommunityModel, parser } from "../Models/CommunityModel";
import MyCommunityBox from "../components/course/MyCommunityBox";

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
  const [content, setContent] = useState<CommunityModel>();

  async function getJoinedCommunities() {
    try {
      const { data, status } = await api.get<ApiResponse>(
        "/communities?page=0&size=5" //TODO - change to users/communities
      );

      console.log(JSON.stringify(data.content, null, 4));

      setContent(parser(data.content));

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
    <Layout title="Future My Course Communities">
      <MyCommunityBox community={CommunityExample} />
      <MyCommunityBox community={CommunityExample} />
      <MyCommunityBox community={CommunityExample} />
    </Layout>
  );
};

export default MyCommunities;
