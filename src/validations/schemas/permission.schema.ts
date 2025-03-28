import * as Yup from "yup";
import { validationMessages } from "../utils/ValidationMessages";
import { Entity } from "@/constants/data/Entity";
import { Creator } from "@/constants/data/Creator";
export const permissionSchema = Yup.object().shape({
  entity: Yup.string()
    .oneOf(Object.values(Entity))
    .required(validationMessages.required("موجودیت")),
  create: Yup.bool(),
  edit: Yup.bool(),
  delete: Yup.bool(),
  read: Yup.bool(),
  statusEdit: Yup.bool(),
  creator: Yup.string()
    .oneOf(Object.values(Creator))
    .required(validationMessages.required("دسترسی")),
  description: Yup.string()
    .min(5, validationMessages.minLength(5))
    .required(validationMessages.required("توضیحات")),
});
