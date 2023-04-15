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

export type RatingSummary = {
  id: number;
  teaching: number;
  content: number;
  workload: number;
};
