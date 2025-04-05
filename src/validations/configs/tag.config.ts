import { TagFormValues } from "@/interfaces/models/ITag";
import { useAppDispatch } from "@/store/hooks";
import { FormikConfig } from "formik";
import { useRouter } from "next/navigation";
import { tagInitial } from "../initials/tag.initial";
import { tagSchema } from "../schemas/tag.schema";
import { createTagAsync } from "@/store/thunks/tagsThunk";
import { toast } from "sonner";
import Error from "next/error";

// configs/tag.config.ts
export const tagConfig = (
  router: ReturnType<typeof useRouter>,
  dispatch: ReturnType<typeof useAppDispatch>
): FormikConfig<TagFormValues> => ({
  initialValues: tagInitial,
  validationSchema: tagSchema,
  onSubmit: async (values, { setSubmitting, resetForm }) => {
    try {
      const finalValues = {
        ...values,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await dispatch(createTagAsync(finalValues)).unwrap();

      toast.success("هشتگ با موفقیت ایجاد شد");
      resetForm();
      setTimeout(() => router.push("/admin/tags"), 1000);
    } catch (error: any) {
      toast.error(error?.message || "خطا در ایجاد هشتگ");
    } finally {
      setSubmitting(false);
    }
  },
});
