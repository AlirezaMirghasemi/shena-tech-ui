import {Status} from "@/constants/Status";

export interface IComment {
    id?:number,
    postId:number,
    userId:number,
    ParentId:number,
    content:string,
    status:Status,
    createdAt:string,
    updatedAt:string
}
