"use client";
import Form from "@/components/admin/pages/Form";
import InputField from "@/components/admin/pages/InputField";
import { useAppDispatch } from "@/store/hooks";
import { tagConfig } from "@/validations/configs/tag.config";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function NewTagPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formik = useFormik(tagConfig(router, dispatch));
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
        headerTitle={"هشتگ"}
        headerDescription={"افزودن هشتگ جدید"}
        formik={formik}
      >
        <div className="max-w-sm space-y-2">
          <InputField
            id={"titlePersian"}
            name={"titlePersian"}
            placeholder={"عنوان فارسی هشتگ"}
            formik={formik}
          />

          <InputField
            id={"titleEnglish"}
            name={"titleEnglish"}
            placeholder={"عنوان انگلیسی هشتگ"}
            formik={formik}
          />
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-hidden focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
          >
            {formik.isSubmitting ? "در حال ثبت..." : "ثبت هشتگ"}
          </button>
        </div>
      </Form>
    </>
  );
}
