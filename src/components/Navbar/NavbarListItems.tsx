import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SearchIcon from "@mui/icons-material/Search";
import { SvgIconProps } from "@mui/material";

type mainNavbarItemsType = Array<{
  id: number;
  icon: React.ReactElement<SvgIconProps>;
  label: string;
  route: string;
}>;

export const mainNavbarItems: mainNavbarItemsType = [
  {
    id: 0,
    icon: <SearchIcon />,
    label: "Search",
    route: "/search",
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    label: "Courses",
    route: "/",
  },
  {
    id: 2,
    icon: <QuestionMarkIcon />,
    label: "Course Page",
    route: "/coursepage",
  },
];
