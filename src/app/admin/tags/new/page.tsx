"use client";
import Form from "@/components/admin/pages/Form";
import ValidatingError from "@/components/common/ValidatingError";
import { ITag } from "@/interfaces/models/ITag";
import { tagConfig } from "@/validations/configs/tag.config";
import { useFormik } from "formik";

export default function NewTagPage() {
  const formik = useFormik<ITag>(tagConfig);
  return (
    <>
      <Form
        headerTitle={"هشتگ"}
        headerDescription={"افزودن هشتگ جدید"}
        formik={formik.handleSubmit}
      >
        <div className="max-w-sm space-y-2">
          <label
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
            placeholder="عنوان هشتگ"
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
          )}

          <label
            htmlFor="slug"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            اسلاگ
          </label>
          <input
            name="slug"
            id="slug"
            value={formik.values.slug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="اسلاگ"
            className={`
                py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                ${
                  formik.touched.slug && formik.errors.slug
                    ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                    : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                }
                `}
          />
          {formik.touched.slug && formik.errors.slug ? (
            <ValidatingError error={formik.errors.slug as string} />
          ) : (
            ""
          )}

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
            placeholder="توضیحات هشتگ"
            className={`
                py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                    : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                }
                `}
          />
          {formik.touched.description && formik.errors.description ? (
            <ValidatingError error={formik.errors.description as string} />
          ) : (
            ""
          )}
          <button
            type="submit"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-hidden focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
          >
            ذخیره
          </button>
        </div>
      </Form>
    </>
  );
}
