import * as Yup from "yup";
import { validationMessages } from "../utils/ValidationMessages";
import { generateSlug } from "@/utils/slugGenerator";
export const tagSchema = Yup.object().shape({
  title: Yup.string()
    .required(validationMessages.required("هشتگ"))
    .min(3, validationMessages.minLength(3))
    .max(20, validationMessages.maxLength(20)),

    slug: Yup.string()
    .transform((value, ctx) => generateSlug(value || ctx.parent.title))
    .required(validationMessages.required("اسلاگ"))
    .matches(
      /^[\p{L}\d-]+$/u, // پذیرش حروف فارسی/لاتین
      'فقط حروف، اعداد و خط تیره مجاز است'
    ),
  description: Yup.string()
    .min(3, validationMessages.minLength(3))
    .max(50, validationMessages.maxLength(50)),
});
