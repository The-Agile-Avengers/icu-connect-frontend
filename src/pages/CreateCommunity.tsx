import CreateCommunityForm from "components/course/CreateCommunityForm";
import Layout from "components/shared/Layout";
import React from "react";
// eslint-disable-next-line
const CreateCommunity: React.FC = () => {
    return (
      <Layout title="Create a new Course">
        <CreateCommunityForm/>
      </Layout>
    );
  };
  
  export default CreateCommunity;