"use client";
import Form from "@/components/admin/pages/Form";
import ValidatingError from "@/components/common/ValidatingError";
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
  const [debouncedPersianTitle, debouncedEnglishTitle] = useDebounce(
    [formik.values.titlePersian, formik.values.titleEnglish],
    500
  );

  useEffect(() => {
    if (debouncedPersianTitle !== undefined)
      formik.validateField("titlePersian");
    if (debouncedEnglishTitle !== undefined)
      formik.validateField("titleEnglish");
  }, [debouncedPersianTitle, debouncedEnglishTitle]);

  return (
    <>
      <Form
        headerTitle={"اسلاگ"}
        headerDescription={"افزودن اسلاگ جدید"}
        formik={formik}
      >
        <div className="max-w-sm space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            عنوان فارسی
          </label>
          <input
            name="titlePersian"
            id="titlePersian"
            value={formik.values.titlePersian}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="عنوان فارسی اسلاگ"
            className={`
                py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                ${
                  formik.touched.titlePersian && formik.errors.titlePersian
                    ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                    : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                }
                `}
          />
          {formik.touched.titlePersian && formik.errors.titlePersian ? (
            <ValidatingError error={formik.errors.titlePersian as string} />
          ) : (
            ""
          )}

          <label
            htmlFor="title"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            عنوان انگلیسی
          </label>
          <input
            name="titleEnglish"
            id="titleEnglish"
            value={formik.values.titleEnglish}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="عنوان انگلیسی اسلاگ"
            className={`
                py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                ${
                  formik.touched.titleEnglish && formik.errors.titleEnglish
                    ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                    : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                }
                `}
          />
          {formik.touched.titleEnglish && formik.errors.titleEnglish ? (
            <ValidatingError error={formik.errors.titleEnglish as string} />
          ) : (
            ""
          )}
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
