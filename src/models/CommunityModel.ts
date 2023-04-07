export type CommunityModel = {
  moduleId: string;
  name: string;
  instructor: Instructor;
  subscribersCount: number;
  rating: Rating;
  joined: boolean;
};

export type Instructor = {
  id: number;
  name: string;
};

export type Rating = {
  id: number;
  teaching: number;
  content: number;
  workload: number;
};
