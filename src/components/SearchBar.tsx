import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

type Props = {
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width: number;
};

// Visualization of a search bar. All logic will be done in the parent component
const SearchBar = ({ placeholder, onChange, width }: Props) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      border: 2,
      borderColor: "primary.main",
      borderRadius: 18,
      p: 2,
      width: `${width}%`,
    }}
  >
    <SearchIcon sx={{ marginRight: "10px" }} />
    <Input
      placeholder={placeholder}
      onChange={onChange}
      sx={{
        width: "85%",
        color: "rgba(0, 0, 0, 0.6)",
        fontSize: "1.1rem",
        borderColor: "black",
      }}
      disableUnderline
    />
  </Box>
);

export default SearchBar;
