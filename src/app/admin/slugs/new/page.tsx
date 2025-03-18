"use client";
import Form from "@/components/admin/pages/Form";
import InputField from "@/components/admin/pages/InputField";
import { useAppDispatch } from "@/store/hooks";
import { slugConfig } from "@/validations/configs/slug.config";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function NewSlugPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formik = useFormik(slugConfig(router, dispatch));
  const [debouncedValues] = useDebounce(
    {
      titlePersian: formik.values.titlePersian,
      titleEnglish: formik.values.titleEnglish,
    },
    500
  );

  useEffect(() => {
    formik.validateField("titlePersian");
  }, [debouncedValues.titlePersian]);
  useEffect(() => {
    formik.validateField("titleEnglish");
  }, [debouncedValues.titleEnglish]);

  return (
    <>
      <Form
        headerTitle={"اسلاگ"}
        headerDescription={"افزودن اسلاگ جدید"}
        formik={formik}
      >
        <div className="max-w-sm space-y-2">
          <InputField
            id={"titlePersian"}
            name={"titlePersian"}
            placeholder={"عنوان فارسی اسلاگ"}
            formik={formik}
          />

          <InputField
            id={"titleEnglish"}
            name={"titleEnglish"}
            placeholder={"عنوان انگلیسی اسلاگ"}
            formik={formik}
          />
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-hidden focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
          >
            {formik.isSubmitting ? "در حال ثبت..." : "ثبت اسلاگ"}
          </button>
        </div>
      </Form>
    </>
  );
}
