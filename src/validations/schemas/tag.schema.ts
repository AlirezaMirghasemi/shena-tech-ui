import * as Yup from "yup";
import { validationMessages } from "../utils/ValidationMessages";
export const tagSchema = Yup.object().shape({
  title: Yup.string()
    .required(validationMessages.required("هشتگ"))
    .min(3, validationMessages.minLength(3))
    .max(20, validationMessages.maxLength(20)),
  slug: Yup.string()
    .required(validationMessages.required("اسلاگ"))
    .min(3, validationMessages.minLength(3))
    .max(50, validationMessages.maxLength(50)),
  description: Yup.string()
    .min(3, validationMessages.minLength(3))
    .max(50, validationMessages.maxLength(50)),
});
