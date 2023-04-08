import React, { useState } from "react";
import Layout from "../components/shared/Layout";
import SearchBar from "../components/SearchBar";

const Search: React.FC = () => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    console.log("get API request for " + input); //TODO - implement
  };

  return (
    <Layout title="Search">
      {" "}
      <SearchBar
        placeholder="Search by moduleId, insturctor or module name"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setInput(event.target.value)
        }
        onClick={handleClick}
      />
    </Layout>
  );
};

export default Search;
