import * as React from "react";
import { styled } from "@mui/material/styles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating, { IconContainerProps } from "@mui/material/Rating";

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIconsTeaching[value].icon}</span>;
}

export const customIconsTeaching: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

type Props = {
  value: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  onChange?: (event: any, newValue: number) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RatingTeaching(props: Props): React.ReactElement<any, any> {
  const StyledRatingTeaching = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
      color: theme.palette.action.disabled,
    },
  }));

  return (
    <StyledRatingTeaching
      name="highlight-selected-only"
      value={props.value}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIconsTeaching[value].label}
      highlightSelectedOnly
      readOnly
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RatingContent(props: Props): React.ReactElement<any, any> {
  const StyledRatingWorkload = styled(Rating)(() => ({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
  }));

  return (
    <StyledRatingWorkload
      name="customized-color"
      value={props.value}
      getLabelText={(value: number) =>
        `${value} Heart${value !== 1 ? "s" : ""}`
      }
      precision={0.5} //TODO - change to 1?
      icon={<FavoriteIcon fontSize="inherit" />}
      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      readOnly
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RatingWorkload(props: Props): React.ReactElement<any, any> {
  return <Rating name="simple-controlled" value={props.value} readOnly />;
}
