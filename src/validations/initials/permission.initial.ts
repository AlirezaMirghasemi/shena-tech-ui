import { Creator } from "@/constants/data/Creator";
import { PermissionFormValues } from "@/interfaces/models/IPermission";

export const permissionInitial:PermissionFormValues = {
    entity: "",
    create: false,
    edit: false,
    delete: false,
    read: false,
    creator: Creator.SELF,
    statusEdit: false,
    description: ""
};
