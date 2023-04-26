import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import { SvgIconProps } from "@mui/material";
import { Settings } from "@mui/icons-material";

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
    label: "Communities",
    route: "/communities",
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    label: "My Communities",
    route: "/",
  },

  {
    id: 2,
    icon: <Settings />,
    label: "My Settings",
    route: "/settings",
  },
];
