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


export type PostForm = {
  title: string;
  text: string;
};

export interface Post extends PostForm {
  id: number;
  user: UserModel;
  creation: string;
  thumbsUp: number;
  comments: string[];
}

export type CommentForm = {
  text: string | null;
};

export interface Comment extends CommentForm {
  id: number;
  user: UserModel;
  timestamp: string;
  thumbsUp: number;

}
