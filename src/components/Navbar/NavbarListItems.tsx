import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SearchIcon from "@mui/icons-material/Search";

type mainNavbarItemsType = Array<{
  id: number;
  icon: any; //TODO: assign correct type
  label: string;
  route: string;
}>;

export const mainNavbarItems: mainNavbarItemsType = [
  {
    id: 0,
    icon: <SearchIcon />,
    label: "Search",
    route: "search",
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    label: "Courses",
    route: "courses",
  },
  {
    id: 2,
    icon: <QuestionMarkIcon />,
    label: "XYZ",
    route: "xyz",
  },
];
