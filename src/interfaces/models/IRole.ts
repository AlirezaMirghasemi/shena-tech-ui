export interface IRole {
    id?:string,
    title: string,
    description: string,
    createdAt: number,
    updatedAt: number
}
export type RoleFormValues=Pick<IRole,'title'|'description'>;
