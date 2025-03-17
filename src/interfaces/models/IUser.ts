import { Gender } from "@/constants/data/Gender";

export interface IUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  password: string;
  bio: string;
  profilePicture: string;
  mobile: string;
  gender: Gender;
  createdAt: number;
  updatedAt: number;
}
export type UserFormValues = Pick<
  IUser,
  | "username"
  | "email"
  | "fullName"
  | "password"
  | "bio"
  | "profilePicture"
  | "mobile"
  | "gender"
>;
