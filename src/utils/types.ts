import { UserModel } from "models/UserModel";

interface IProps {
  children: React.ReactNode;
}

export type { IProps };

export type RatingForm = {
  content: number;
  teaching: number;
  workload: number;
  text: string | null;
};

export interface Rating extends RatingForm {
  id: number;
  user: UserModel;
  timestamp: string;
  thumbsUp: number;
}
