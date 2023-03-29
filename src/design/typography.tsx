import { Typography } from "@mui/material";
import React from "react";

type TitleProps = {
  title: string;
};

type LegendProps = {
  label: string;
  value?: string;
};

export const PageTitle = (props: TitleProps) => (
  <Typography variant="h1">{props.title}</Typography>
);

export const BoxTitle = (props: TitleProps) => (
  <Typography variant="h2">{props.title}</Typography>
);

export const Legend = (props: LegendProps) => (
  <Typography sx={{ mt: 2 }}>
    <b>{props.label}</b>
    {props.value}
  </Typography>
);
