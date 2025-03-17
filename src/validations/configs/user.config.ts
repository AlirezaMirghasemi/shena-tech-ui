import { UserFormValues } from "@/interfaces/models/IUser";
import { useAppDispatch } from "@/store/hooks";
import { FormikConfig } from "formik";
import { useRouter } from "next/navigation";
import { userInitial } from "../initials/user.initial";
import { userSchema } from "../schemas/user.schema";
import { createUserAsync } from "@/store/thunks/usersThunk";
import { toast } from "sonner";
import { hashPassword } from "../../utils/authHelper";
import { uploadFile } from "@/services/common/uploadFile";
export const userConfig = (
  router: ReturnType<typeof useRouter>,
  dispatch: ReturnType<typeof useAppDispatch>
): FormikConfig<UserFormValues> => ({
  initialValues: userInitial,
  validationSchema: userSchema,
  onSubmit: async (values, { setSubmitting, resetForm }) => {
    let uploadedFilename = "";

    try {
      if (values.profilePicture) {
        uploadedFilename = await uploadFile(
          values.profilePicture as unknown as File
        );
      }
      const hashedPassword = await hashPassword(values.password);
      values.password = hashedPassword;
      console.log(values);

      const finalValues = {
        ...values,
        profilePicture: uploadedFilename,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await dispatch(createUserAsync(finalValues)).unwrap();
      toast.success("کاربر با موفقیت ایجاد شد");
      resetForm();
      router.replace("/admin/users");
    } catch (error: any) {
      toast.error(error?.message || "خطا در ایجاد کاربر");
      if (uploadedFilename) {
        await fetch("/api/deleteFile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: uploadedFilename }),
        });
      }
    } finally {
      setSubmitting(false);
    }
  },
});
