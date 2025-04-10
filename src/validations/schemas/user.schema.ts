import * as Yup from "yup";
import { validationMessages } from "../utils/ValidationMessages";
import { checkUniqueField } from "@/services/common/CheckUniqueField";
import { Gender } from "@/constants/data/Gender";
export const userSchema = (
  initialUsername?: string,
  initialEmail?: string,
  initialMobile?: string
) =>
  Yup.object().shape({
    username: Yup.string()
      .required(validationMessages.required("نام کاربری"))
      .min(8, validationMessages.minLength(8))
      .max(20, validationMessages.maxLength(20))
      .matches(/^[a-zA-Z0-9_]+$/, validationMessages.matchEnglish)
      .test(
        "is-unique",
        validationMessages.unique("نام کاربری"),
        async (value) => {
          if (initialUsername && value == initialUsername) return true;
          return await checkUniqueField(
            `http://localhost:3001/users?username=${value}`
          );
        }
      ),
    email: Yup.string()
      .email(validationMessages.invalid("پست الکترونیکی"))
      .test(
        "is-unique",
        validationMessages.unique("پست الکترونیکی"),
        async (value) => {
          if (initialEmail && value == initialEmail) return true;
          return await checkUniqueField(
            `http://localhost:3001/users?email=${value}`
          );
        }
      )
      .required(validationMessages.required("پست الکترونیکی")),
    fullName: Yup.string()
      .min(3, validationMessages.minLength(3))
      .max(50, validationMessages.maxLength(50)),
    password: Yup.string()
      .min(8, validationMessages.minLength(8))
      .required(validationMessages.required("رمز عبور"))
      .matches(/(?=.*[a-z])/, "رمز عبور باید شامل حداقل یک حرف کوچک باشد")
      .matches(/(?=.*[A-Z])/, "رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "رمز عبور باید شامل حداقل یک علامت خاص باشد"
      ),
    bio: Yup.string().max(120, validationMessages.maxLength(120)),
    gender: Yup.string().oneOf(Object.values(Gender)),
    profilePicture: Yup.mixed()
      .nullable()
      .test("fileSize", "حجم فایل نباید از 2 مگابایت بیشتر باشد", (value) => {
        if (!value) return true;
        {console.log(value as File)}
        return (value as File).size <= 2  * 1024 * 1024;
      })
      .test("fileType", "فرمت فایل باید JPEG یا PNG باشد", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png","image/jpg"].includes((value as File).type);
      }),
    mobile: Yup.string()
      .max(11, validationMessages)
      .matches(/^09\d{9}$/, validationMessages.invalidMobile)
      .test(
        "is-unique",
        validationMessages.unique("شماره تلفن همراه"),
        async (value) => {
          if (initialMobile && value == initialMobile) return true;
          return await checkUniqueField(
            `http://localhost:3001/users?mobile=${value}`
          );
        }
      ),
  });
