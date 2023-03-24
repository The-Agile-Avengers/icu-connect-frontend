import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

const actions = [
  { icon: <AddCommentIcon />, name: 'New Post' },
  { icon: <ThumbsUpDownIcon />, name: 'New Rating' }
];
interface BasicSpeedDialProps {
  communityId: string;
}

export default function BasicSpeedDial(props: BasicSpeedDialProps) {
  const navigate = useNavigate();
  const communityId = props.communityId;

  function handleClick(name:string) {
    if (name === 'New Post') {
      const path = `/postForm`;
      navigate(path);
    } else if (name === 'New Rating') {
      const path = `/reviewForm/`+ communityId;
      navigate(path);
    }
  }

  return (
    <Box
      color="#21B34B"
      sx={{ height: 220, transform: 'translateZ(0px)', flexGrow: 1 }}
    >
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 0, right: 0 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
