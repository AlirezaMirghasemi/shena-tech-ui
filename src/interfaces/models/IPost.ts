import { Status } from "@/constants/Status";
import {Type} from "@/constants/Type";


export interface IPost {
    id?:number,
    userId:number,
    title:string,
    jsonBody:string,
    status:Status,
    type:Type,
    createdAt:number,
    updatedAt:number







}
