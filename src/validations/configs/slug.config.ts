import { useAppDispatch } from "@/store/hooks";
import { FormikConfig } from "formik";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { SlugFormValues } from "@/interfaces/models/ISlug";
import { slugInitial } from "../initials/slug.initial";
import { slugSchema } from "../schemas/slug.schema";
import { createSlugAsync } from "@/store/thunks/slugsThunk";

// configs/slug.config.ts
export const slugConfig = (
    router: ReturnType<typeof useRouter>,
    dispatch: ReturnType<typeof useAppDispatch>
  ): FormikConfig<SlugFormValues> => ({
    initialValues: slugInitial,
    validationSchema: slugSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const finalValues = {
          ...values,
          createdAt: Date.now(),
          updatedAt: Date.now()
        };

        const result = await dispatch(
          createSlugAsync(finalValues)
        ).unwrap();

        toast.success("اسلاگ با موفقیت ایجاد شد");
        resetForm();
        setTimeout(() => router.push("/admin/slugs"), 1000);
      } catch (error: any) {
        toast.error(error?.message || "خطا در ایجاد اسلاگ");
      } finally {
        setSubmitting(false);
      }
    }
  });
