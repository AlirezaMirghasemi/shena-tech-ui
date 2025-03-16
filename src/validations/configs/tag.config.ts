import { TagFormValues } from "@/interfaces/models/ITag";
import { useAppDispatch } from "@/store/hooks";
import { FormikConfig } from "formik";
import { useRouter } from 'next/navigation';
import { tagInitial } from "../initials/tag.initial";
import { tagSchema } from "../schemas/tag.schema";
import { generateSlug } from "@/utils/slugGenerator";
import { createTagAsync } from "@/store/thunks/tagsThunk";
import { toast } from "sonner";

// configs/tag.config.ts
export const tagConfig = (
    router: ReturnType<typeof useRouter>,
    dispatch: ReturnType<typeof useAppDispatch>
  ): FormikConfig<TagFormValues> => ({
    initialValues: tagInitial,
    validationSchema: tagSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // تولید نهایی اسلاگ قبل از ارسال
        const finalValues = {
          ...values,
          createdAt: Date.now(),
          updatedAt: Date.now()
        };

        const result = await dispatch(
          createTagAsync(finalValues)
        ).unwrap();

        toast.success("هشتگ با موفقیت ایجاد شد");
        resetForm();
        setTimeout(() => router.push("/admin/tags"), 1000);
      } catch (error: any) {
        toast.error(error?.message || "خطا در ایجاد هشتگ");
      } finally {
        setSubmitting(false);
      }
    }
  });
