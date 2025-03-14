import {Status} from "@/constants/data/Status";

export interface IComment {
    id:number|null,
    postId:number,
    userId:number,
    ParentId:number,
    content:string,
    status:Status,
    createdAt:number,
    updatedAt:number
}
