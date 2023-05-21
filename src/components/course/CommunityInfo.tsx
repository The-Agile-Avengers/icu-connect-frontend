import * as React from "react";
import Box from "@mui/material/Box";
import { Legend } from "../../design/typography";
import HoverRating from "./rating/HoverRating";
import { CommunityModel } from "../../utils/types";

type Props = {
  community: CommunityModel;
};

// Component to visualize the Community information. Logic is handled by parent.
export default function CommunityInfo({ community }: Props) {
  return (
    <Box>
      <Legend label="Course Name: " value={community ? community.name : ""} />
      <Legend label="Module ID: " value={community ? community.moduleId : ""} />
      <Legend
        label="Teacher: "
        value={community ? community.instructor.name : ""}
      />
      <Legend label="Course Content" />
      <HoverRating
        value={community ? Math.round(community.rating.content) : 0}
        type="CONTENT"
        readonly
      />
      <Legend label="Teaching" />
      <HoverRating
        value={community ? Math.round(community.rating.teaching) : 0}
        type="TEACHING"
        readonly
      />
      <Legend label="Workload" />
      <HoverRating
        value={community ? Math.round(community.rating.workload) : 0}
        type="WORKLOAD"
        readonly
      />
    </Box>
  );
}
