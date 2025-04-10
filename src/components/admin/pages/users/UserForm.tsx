import { UserFormValues } from "@/interfaces/models/IUser";
import { userInitial } from "@/validations/initials/user.initial";
import { userSchema } from "@/validations/schemas/user.schema";
import { Formik, useFormikContext } from "formik";
import DynamicForm from "../DynamicForm";
import InputField from "../InputField";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { Gender } from "../../../../constants/data/Gender";
import FileUploader from "@/components/common/FileUploader";
import { useImages } from "@/hooks/DB/useImages";
import { IImage } from "@/interfaces/models/IImage";

interface UserFormProps {
  initialValues: UserFormValues;
  onSubmit: (values: UserFormValues) => Promise<void>;
  isSubmitting: boolean;
  title: string;
  description: string;
  originalUsername?: string;
  originalEmail?: string;
  originalMobile?: string;
}

const DebouncedValidation = () => {
  const { values, validateField } = useFormikContext<UserFormValues>();
  const [debouncedUsername] = useDebounce(values.username, 500);
  const [debouncedEmail] = useDebounce(values.email, 500);
  const [debouncedMobile] = useDebounce(values.mobile, 500);

  useEffect(() => {
    validateField("username");
  }, [debouncedUsername, validateField]);

  useEffect(() => {
    validateField("email");
  }, [debouncedEmail, validateField]);

  useEffect(() => {
    validateField("mobile");
  }, [debouncedMobile, validateField]);

  return null;
};

export default function UserForm({
  initialValues = userInitial,
  originalUsername,
  originalEmail,
  originalMobile,
  onSubmit,
  isSubmitting,
  title,
  description,
}: UserFormProps) {
  const { actions } = useImages();

  // استفاده از state محلی جهت نگهداری اطلاعات عکس قبلی
  const [previewOldImage, setPreviewOldImage] = useState<IImage | null>(null);

  useEffect(() => {
    // اگر initialValues.imageId خالی نباشد، عکس قبلی را بارگیری کن
    if (initialValues.imageId && initialValues.imageId !== "") {
      const fetchOldImage = async () => {
        try {
          const image = await actions.getImageById(
            initialValues.imageId as string
          );
          if (image.payload) {
            setPreviewOldImage(image.payload as IImage);
          }
        } catch (error) {
          console.error("خطا در دریافت عکس قبلی:", error);
          setPreviewOldImage(null);
        }
      };
      fetchOldImage();
    } else {
      // در صورت نداشتن imageId، مقدار state را به null تنظیم کن
      setPreviewOldImage(null);
    }
  }, [initialValues.imageId]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={userSchema(
        originalUsername,
        originalEmail,
        originalMobile
      )}
      validateOnChange={false}
    >
      <DynamicForm headerTitle={title} headerDescription={description}>
        <div className="max-w-sm space-y-2">
          <DebouncedValidation />
          <InputField
            id="username"
            name="username"
            placeholder="نام کاربری"
            disabled={isSubmitting}
          />
          <InputField
            id="email"
            name="email"
            placeholder="پست الکترونیکی"
            type="email"
            disabled={isSubmitting}
          />
          <InputField
            id="fullName"
            name="fullName"
            placeholder="نام کامل"
            disabled={isSubmitting}
          />
          <InputField
            id="mobile"
            name="mobile"
            placeholder="تلفن همراه"
            disabled={isSubmitting}
          />
          <InputField
            id="password"
            name="password"
            placeholder="رمز عبور"
            type="password"
            disabled={isSubmitting}
          />
          <InputField
            id="bio"
            name="bio"
            placeholder="بیوگرافی"
            as="textarea"
            disabled={isSubmitting}
          />
          <InputField
            id="gender"
            name="gender"
            placeholder="جنسیت"
            as="select"
            disabled={isSubmitting}
            data={Object.values(Gender)}
          />
          <InputField
            type="file"
            as="file"
            name="profilePicture"
            id="profilePicture"
            disabled={isSubmitting}
            placeholder="عکس پروفایل خود را وارد کنید"
            component={({ field, form }) => (
              <FileUploader
                field={field}
                form={form}
                title={"عکس پروفایل کاربر"}
                previewOld={previewOldImage?.directory} // ارسال مقدار URL عکس قبلی اگر موجود باشد
              />
            )}
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-hidden focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
          >
            {isSubmitting ? "در حال ثبت ..." : "ذخیره کاربر"}
          </button>
        </div>
      </DynamicForm>
    </Formik>
  );
}
