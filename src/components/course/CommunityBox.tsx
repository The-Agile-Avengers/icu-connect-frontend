import React from "react";
import { CommunityModel } from "../../models/CommunityModel";
import Box from "../shared/Box";
import { useNavigate } from "react-router-dom";

type Props = {
  community: CommunityModel;
  boxWidth: number;
};

const MyCommunityBox: React.FC<Props> = ({ community, boxWidth }: Props) => {
  const navigate = useNavigate();

  //TODO - add join/leave button
  return (
    <Box
      title={community.name}
      sx={{
        bgcolor: "secondary.main",
        p: 3,
        borderRadius: "16px",
        "&:hover": {
          cursor: "pointer",
        },
        flex: `0 0 ${boxWidth}%`,
      }}
      onClick={() => navigate(`/community/${community.moduleId}`)}
    >
      <p>ModuleId: {community.moduleId}</p>
      <p>Instructor: {community.instructor.name}</p>
    </Box>
  );
};

export default MyCommunityBox;
