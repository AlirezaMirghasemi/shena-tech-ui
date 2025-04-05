import * as Yup from "yup";
import { validationMessages } from "../utils/ValidationMessages";
import { checkUniqueField } from "@/services/common/CheckUniqueField";
export const tagSchema = (
  initialEnglishTitle?: string,
  initialPersianTitle?: string
) =>
  Yup.object().shape({
    titlePersian: Yup.string()
      .required(validationMessages.required("عنوان فارسی هشتگ"))
      .min(3, validationMessages.minLength(3))
      .max(20, validationMessages.maxLength(20))
      .matches(
        /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u06CC\u0629\u0643\u0621-\u0624\u0626٠-٩0-9_]+$/,
        validationMessages.matchPersian
      )
      .test(
        "titlePersian-is-unique",
        validationMessages.unique("عنوان فارسی هشتگ"),
        async (value) => {
          if (initialPersianTitle && value == initialPersianTitle) return true;
          return await checkUniqueField(
            `http://localhost:3001/tags?titlePersian=${value}`
          );
        }
      ),
    titleEnglish: Yup.string()
      .required(validationMessages.required("عنوان انگلیسی هشتگ"))
      .min(3, validationMessages.minLength(3))
      .max(20, validationMessages.maxLength(20))
      .matches(/^[a-zA-Z0-9_]+$/, validationMessages.matchEnglish)
      .test(
        "titleEnglish-is-unique",
        validationMessages.unique("عنوان انگلیسی هشتگ"),
        async (value) => {
          if (initialEnglishTitle && value == initialEnglishTitle) return true;
          return await checkUniqueField(
            `http://localhost:3001/tags?titleEnglish=${value}`
          );
        }
      ),
  });
