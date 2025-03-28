import { PermissionFormValues } from "@/interfaces/models/IPermission";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { permissionInitial } from "../initials/permission.initial";
import { permissionSchema } from "../schemas/permission.schema";
import { createPermissionAsync } from "@/store/thunks/permissionThunk";
import { toast } from "sonner";
import { FormikConfig } from "formik";

// configs/permission.config.ts
export const permissionConfig = (
  router: ReturnType<typeof useRouter>,
  dispatch: ReturnType<typeof useAppDispatch>
): FormikConfig<PermissionFormValues> => ({
  initialValues: permissionInitial,
  validationSchema: permissionSchema,
  onSubmit: async (values, { setSubmitting, resetForm }) => {
    try {
      const finalValues = {
        ...values,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await dispatch(createPermissionAsync(finalValues)).unwrap();

      toast.success("مجوز با موفقیت ایجاد شد");
      resetForm();
      setTimeout(() => router.push("/admin/permissions"), 1000);
    } catch (error: any) {
      toast.error(error?.message || "خطا در ایجاد مجوز");
    } finally {
      setSubmitting(false);
    }
  },
});
