import { Gender } from "@/constants/data/Gender";

export interface IUser {
  id?: string;
  username: string;
  email: string;
  fullName: string;
  password: string;
  bio: string;
  profilePicture?: File;
  mobile: string;
  gender: Gender;
  createdAt: number;
  updatedAt: number;
  imageId?:string
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
  |"imageId"
>;
