import { Creator } from "@/constants/data/Creator";
import { Entity } from "@/constants/data/Entity";

export interface IPermission {
  id?: string;
  entity: Entity | "";
  create: boolean;
  edit: boolean;
  delete: boolean;
  read: boolean;
  statusEdit: boolean;
  creator: Creator;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export type PermissionFormValues = Pick<
  IPermission,
  | "entity"
  | "create"
  | "edit"
  | "delete"
  | "read"
  | "creator"
  | "statusEdit"
  | "description"
>;
