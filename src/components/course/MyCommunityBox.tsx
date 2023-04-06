import React from "react";
import { CommunityModel } from "../../Models/CommunityModel";
import Box from "../shared/Box";

type Props = {
  community: CommunityModel;
};

const MyCommunityBox: React.FC<Props> = ({ community }: Props) => (
  <Box
    title={community.name}
    sx={{
      bgcolor: "secondary.main",
      p: 3,
      m: 3,
      borderRadius: "16px",
    }}
  >
    <p>ModuleId: {community.moduleId}</p>
    <p>Instructor: {community.instructor.name}</p>
  </Box>
);

export default MyCommunityBox;
