export type RatingModel = {
  id: number | undefined;
  teaching: number;
  content: number;
  workload: number;
  user: {
    id: number;
    username: string;
  };
  creation: string;
  text: string | null;
  thumbsUp: number;
};
