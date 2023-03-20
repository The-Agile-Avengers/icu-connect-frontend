import { Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
};

export const PageTitle = (props: Props) => <Typography variant="h1">{props.title}</Typography>;

export const BoxTitle = (props: Props) => <Typography variant="h2">{props.title}</Typography>;
