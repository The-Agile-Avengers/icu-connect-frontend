import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

const actions = [
  { icon: <AddCommentIcon />, name: 'New Post' },
  { icon: <ThumbsUpDownIcon />, name: 'New Rating' }
];

export default function BasicSpeedDial() {
  return (
    <Box color="#21B34B" sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}