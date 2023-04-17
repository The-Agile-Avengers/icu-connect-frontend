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
  commentList: SingleComment[];
}

export type CommentForm = {
  text: string;
};

export interface SingleComment extends CommentForm {
  id: number;
  creator: UserModel;
  creation: string;
}
