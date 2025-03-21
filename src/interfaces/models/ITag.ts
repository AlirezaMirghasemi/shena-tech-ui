export interface ITag{
    id:number,
    titlePersian:string,
    titleEnglish:string,
    createdAt:number,
    updatedAt:number
}

export type TagFormValues=Pick<ITag,'titlePersian'|'titleEnglish'>;
