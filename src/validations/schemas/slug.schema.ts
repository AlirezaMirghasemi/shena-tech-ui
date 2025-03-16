import * as Yup from 'yup';
import { validationMessages } from '../utils/ValidationMessages';
export const slugSchema = Yup.object().shape({
 titlePersian: Yup.string()
    .required(validationMessages.required("عنوان فارسی سلاگ"))
    .min(3, validationMessages.minLength(3))
    .max(20, validationMessages.maxLength(20))
    .matches(
      /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u06CC\u0629\u0643\u0621-\u0624\u0626٠-٩0-9_]+$/,
      validationMessages.matchPersian
    ),
  titleEnglish: Yup.string()
    .required(validationMessages.required("عنوان انگلیسی اسلاگ"))
    .min(3, validationMessages.minLength(3))
    .max(20, validationMessages.maxLength(20))
    .matches(/^[a-zA-Z0-9_]+$/, validationMessages.matchEnglish),
}) ;
