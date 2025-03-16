export interface ISlug{
    id:number,
    titlePersian:string,
    titleEnglish:string,
    createdAt:number,
    updatedAt:number
}

export type SlugFormValues=Pick<ISlug,'titlePersian'|'titleEnglish'>;
