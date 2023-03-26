import React from "react";
import MuiBox from "@mui/material/Box";
import { BoxTitle } from "../../design/typography";

interface IProps {
  children?: React.ReactNode;
  title?: string;
  [key: string]: unknown;
}

export type { IProps };

const Box: React.FC<IProps> = ({ children, title, ...props }: IProps) => (
  <MuiBox {...props}>
    {title && <BoxTitle title={title} />}
    {children}
  </MuiBox>
);

export default Box;
