export interface ITag{
    id:number,
    title:string,
    slug:string,
    description?:string,
    createdAt:number,
    updatedAt:number
}

export type TagFormValues=Pick<ITag,'title'|'slug'|'description'>;
