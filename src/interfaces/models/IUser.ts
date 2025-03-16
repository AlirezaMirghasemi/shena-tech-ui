import { Gender } from "@/constants/data/Gender";

export interface IUser {
  id: number;
  username: string;
  email: string;
  fullName: string | null;
  password: string;
  bio: string | null;
  profilePicture: string | null;
  mobile: string;
  gender: Gender | null;
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
