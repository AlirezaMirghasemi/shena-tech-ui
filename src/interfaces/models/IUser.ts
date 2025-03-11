import { Gender } from "@/constants/Gender";

export interface IUser {
    id?: number,
    roleId: number,
    username: string,
    email: string,
    fullName?: string,
    password: string,
    bio?: string,
    profilePicture?: string,
    mobile: string,
    gender?: Gender,
    createdAt?: number,
    updatedAt?: number
}
