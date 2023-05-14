//ANCHOR - USER
export interface UserModel {
  id: number;
  username: string;
  email: string;
  avatar: string;
  studyArea: StudyAreaModel;
}

//ANCHOR - COMMUNITY
export type CommunityModel = {
  moduleId: string;
  name: string;
  instructor: Instructor;
  subscribersCount: number;
  rating: RatingSummary;
  joined: boolean;
};

export type Instructor = {
  id: number;
  name: string;
};

//ANCHOR - RATING
export type RatingForm = {
  content: number;
  teaching: number;
  workload: number;
  text: string | null;
};

export interface RatingModel extends RatingForm {
  id: number | undefined;
  user: UserModel;
  creation: string;
  thumbsUp: number;
  hasLiked: boolean;
}

export type RatingSummary = {
  id: number;
  teaching: number;
  content: number;
  workload: number;
};

//ANCHOR - POST
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
  user: UserModel;
  creation: string;
}

//ANCHOR - OTHER
interface IProps {
  children: React.ReactNode;
}

export type { IProps };

export type StudyAreaModel = {
  id: number;
  name: string;
};

//ANCHOR - Files
export interface FileModel {
  id: number;
  creation: string;
  fileName: string;
  filePath: string;
  user: UserModel;
  hasUploaded: boolean;
}
