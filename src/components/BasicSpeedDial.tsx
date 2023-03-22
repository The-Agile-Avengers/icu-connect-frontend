import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

const actions = [
  { icon: <AddCommentIcon />, name: 'New Post' },
  { icon: <ThumbsUpDownIcon />, name: 'New Rating' }
];

export default function BasicSpeedDial() {
  return (
    <Box color="#21B34B" sx={{height: 220, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolut', bottom: 0, right: 0}}
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