export interface ISlug{
    id:number,
    titlePersian:string,
    titleEnglish:string,
    createdAt:number,
    updatedAt:number
}

export type TagFormValues=Pick<ISlug,'titlePersian'|'titleEnglish'>;
