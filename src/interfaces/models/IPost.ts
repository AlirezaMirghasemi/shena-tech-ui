import { Status } from "@/constants/data/Status";
import {Type} from "@/constants/data/Type";


export interface IPost {
    id:number|null,
    userId:number,
    slugId:number,
    title:string,
    content:string,
    status:Status,
    type:Type,
    createdAt:number,
    updatedAt:number







}
