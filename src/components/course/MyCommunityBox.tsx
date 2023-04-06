import React from "react";
import { CommunityModel } from "../../Models/CommunityModel";
import Box from "../shared/Box";
import { useNavigate } from "react-router-dom";

type Props = {
  community: CommunityModel;
};

const MyCommunityBox: React.FC<Props> = ({ community }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      title={community.name}
      sx={{
        bgcolor: "secondary.main",
        p: 3,
        m: 3,
        borderRadius: "16px",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => navigate("community/" + community.moduleId)}
    >
      <p>ModuleId: {community.moduleId}</p>
      <p>Instructor: {community.instructor.name}</p>
    </Box>
  );
};

export default MyCommunityBox;
