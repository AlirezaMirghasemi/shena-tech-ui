//TODO:در هنگام تایپ کاربر یونیک بودن رو چک کن

import * as Yup from 'yup';
import { validationMessages } from '../utils/ValidationMessages';
export const roleSchema = Yup.object().shape({
 title: Yup.string()
    .required(validationMessages.required("عنوان نقش"))
    .min(3, validationMessages.minLength(3))
    .max(20, validationMessages.maxLength(20)),

  description: Yup.string()
    .required(validationMessages.required("توضیحات نقش"))
    .min(3, validationMessages.minLength(3))
    .max(100, validationMessages.maxLength(20))
}) ;
