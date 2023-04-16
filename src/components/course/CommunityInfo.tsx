import * as React from "react";
import Box from "@mui/material/Box";
import { Legend } from "../../design/typography";
import HoverRating from "./rating/HoverRating";
import { CommunityModel } from "../../models/CommunityModel";

type Props = {
  community: CommunityModel;
};

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
        value={community ? community.rating.content : 0}
        type="CONTENT"
      />
      <Legend label="Teaching" />
      <HoverRating
        value={community ? community.rating.teaching : 0}
        type="TEACHING"
      />
      <Legend label="Workload" />
      <HoverRating
        value={community ? community.rating.workload : 0}
        type="WORKLOAD"
      />
    </Box>
  );
}
