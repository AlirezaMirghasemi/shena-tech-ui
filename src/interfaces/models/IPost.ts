import { Status } from "@/constants/data/Status";
import {Type} from "@/constants/data/Type";


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
