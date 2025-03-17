import { Gender } from "@/constants/data/Gender";
import { UserFormValues } from "@/interfaces/models/IUser";

export const userInitial:UserFormValues={
    username: "",
    email: "",
    fullName: "",
    password: "",
    bio: "",
    profilePicture: "",
    mobile:"",
    gender: Gender.NotSpecified
}
