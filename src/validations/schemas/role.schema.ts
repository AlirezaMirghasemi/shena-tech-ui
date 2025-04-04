import * as Yup from "yup";
import { validationMessages } from "../utils/ValidationMessages";
import { checkUniqueField } from "@/services/common/CheckUniqueField";
export const roleSchema =(initialTitle?: string) => Yup.object().shape({
  title: Yup.string()
    .required(validationMessages.required("عنوان نقش"))
    .min(3, validationMessages.minLength(3))
    .max(20, validationMessages.maxLength(20))
    .test(
      "is-unique",
      validationMessages.unique("عنوان نقش"),
      async (value) => {
        if(initialTitle && value == initialTitle) return true;
        return await checkUniqueField(
          `http://localhost:3001/roles?title=${value}`
        );
      }
    ),

  description: Yup.string()
    .required(validationMessages.required("توضیحات نقش"))
    .min(3, validationMessages.minLength(3))
    .max(100, validationMessages.maxLength(20)),
});
