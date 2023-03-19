import { Typography } from "@mui/material";
import React from "react";

type Props = {
    title: string
  };

export const PageTitle = (props: Props) => {
    return (
      <Typography variant="h1">{props.title}</Typography>
    )
  }

export const BoxTitle = (props: Props) => {
    return (
      <Typography variant="h2">{props.title}</Typography>
    )
  }