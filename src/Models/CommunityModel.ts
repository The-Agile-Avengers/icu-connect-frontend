/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export type CommunityModel = {
  moduleId: string;
  name: string;
  instructor: Instructor;
  subscribersCount: number;
  rating: Rating;
  joined: boolean;
};

type Instructor = {
  id: number;
  name: string;
};

type Rating = {
  id: number;
  teaching: number;
  content: number;
  workload: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parser(object: any): CommunityModel {
  return {
    moduleId: object.moduleId,
    name: object.name,
    instructor: object.instructor,
    subscribersCount: object.subscribersCount,
    rating: object.rating,
    joined: object.joined,
  };
}
