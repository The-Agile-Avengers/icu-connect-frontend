import React from "react";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material';

export type CopyrightProps = {
  sx: SxProps;
};

const Copyright: React.FC<CopyrightProps> = ({sx}: CopyrightProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        ICU Connect
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default Copyright