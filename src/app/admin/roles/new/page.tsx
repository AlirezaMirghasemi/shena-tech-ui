"use client";
import Form from "@/components/admin/pages/DynamicForm";
import InputField from "@/components/admin/pages/InputField";
import ValidatingError from "@/components/common/ValidatingError";
import { getInputClass } from "@/constants/theme/InputClass";
import { useAppDispatch } from "@/store/hooks";
import { roleConfig } from "@/validations/configs/role.config";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function NewRolePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formik = useFormik(roleConfig(router, dispatch));
  const [debouncedTitle] = useDebounce(formik.values.title, 500);
  useEffect(() => {
    if (debouncedTitle) formik.validateField("title");
  }, [debouncedTitle]);






  return (
    <>
      <Form
        headerTitle={"نقش"}
        headerDescription={"افزودن نقش جدید"}
        formik={formik}
      >
        <div className="max-w-sm space-y-2">
          {/* <label
            htmlFor="title"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            عنوان
          </label>
          <input
            name="title"
            id="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="عنوان نقش"
            className={`
                py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                    : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                }
                `}
          />
          {formik.touched.title && formik.errors.title ? (
            <ValidatingError error={formik.errors.title as string} />
          ) : (
            ""
          )} */}
          <InputField
            id={"title"}
            name={"title"}
            placeholder={"عنوان نقش"}
            formik={formik}
          />
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            توضیحات
          </label>
          <textarea
            name="description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="توضیحات نقش"
            className={getInputClass(
              !!formik.touched.title,
              formik.errors.title
            )}
          />
          {formik.touched.description && formik.errors.description ? (
            <ValidatingError error={formik.errors.description as string} />
          ) : (
            ""
          )}
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-hidden focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
          >
            {formik.isSubmitting ? "در حال ثبت..." : "ثبت نقش"}
          </button>
        </div>
      </Form>
    </>
  );
}
