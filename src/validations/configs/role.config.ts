import { RoleFormValues } from "@/interfaces/models/IRole";
import { useAppDispatch } from "@/store/hooks";
import { FormikConfig } from "formik";
import { useRouter } from "next/navigation";
import { roleInitial } from "../initials/role.initial";
import { roleSchema } from "../schemas/role.schema";
import { createRoleAsync } from "@/store/thunks/rolesThunk";
import { toast } from "sonner";

// configs/role.config.ts
export const roleConfig = (
  router: ReturnType<typeof useRouter>,
  dispatch: ReturnType<typeof useAppDispatch>
): FormikConfig<RoleFormValues> => ({
  initialValues: roleInitial,
  validationSchema: roleSchema,
  onSubmit: async (values, { setSubmitting, resetForm }) => {
    try {
      const finalValues = {
        ...values,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await dispatch(createRoleAsync(finalValues)).unwrap();

      toast.success("نقش با موفقیت ایجاد شد");
      resetForm();
      setTimeout(() => router.push("/admin/roles"), 1000);
    } catch (error: any) {
      toast.error(error?.message || "خطا در ایجاد نقش");
    } finally {
      setSubmitting(false);
    }
  },
});
