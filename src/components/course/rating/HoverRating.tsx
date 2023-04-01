import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const labelsWorkload: { [index: string]: string } = {
  0.5: "low",
  1: "low+",
  1.5: "low",
  2: "moderate",
  2.5: "moderate",
  3: "moderate",
  3.5: "moderate-high",
  4: "high+",
  4.5: "very high",
  5: "very high",
};

type props = {
  value: number;
  type: "CONTENT" | "TEACHING" | "WORKLOAD";
  // eslint-disable-next-line no-unused-vars
  setValue?: (e: number | null) => void;
  readonly?: boolean;
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({
  value,
  setValue,
  readonly,
  type,
}: props) {
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        readOnly={readonly}
        onChange={(event, newHover) => {
          setValue ? setValue(newHover) : null;
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>
          {type === "WORKLOAD"
            ? labelsWorkload[hover !== -1 ? hover : value]
            : labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </Box>
  );
}
