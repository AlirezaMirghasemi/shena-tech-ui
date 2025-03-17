"use client";
import Form from "@/components/admin/pages/Form";
import InputField from "@/components/admin/pages/InputField";
import ValidatingError from "@/components/common/ValidatingError";
import { getInputClass } from "@/constants/theme/InputClass";
import { useAppDispatch } from "@/store/hooks";
import { userConfig } from "@/validations/configs/user.config";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function NewUserPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formik = useFormik(userConfig(router, dispatch));

  const [debouncedValues] = useDebounce(
    {
      username: formik.values.username,
      email: formik.values.email,
      mobile: formik.values.mobile,
    },
    500
  );

  useEffect(() => {
    formik.validateField("username");
  }, [debouncedValues.username]);
  useEffect(() => {
    formik.validateField("email");
  }, [debouncedValues.email]);
  useEffect(() => {
    formik.validateField("mobile");
  }, [debouncedValues.mobile]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        formik.setFieldValue("profilePicture", file);
      }
    },
    [formik]
  );

  return (
    <Form
      headerTitle={"کاربر"}
      headerDescription={"افزودن کاربر جدید"}
      formik={formik}
    >
      <div className="max-w-sm space-y-4">
        <InputField
          id="username"
          name="username"
          placeholder="نام کاربری"
          formik={formik}
        />
        <InputField
          id="email"
          name="email"
          placeholder="پست الکترونیکی"
          formik={formik}
        />
        <InputField
          id="fullName"
          name="fullName"
          placeholder="نام کامل"
          formik={formik}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          placeholder="رمز عبور"
          formik={formik}
        />
        <InputField
          id="mobile"
          name="mobile"
          placeholder="شماره تلفن همراه"
          formik={formik}
        />
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            درباره ی من
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="درباره ی من"
            className={getInputClass(!!formik.touched.bio, formik.errors.bio)}
          />
          {formik.touched.bio && formik.errors.bio && (
            <ValidatingError error={formik.errors.bio as string} />
          )}
        </div>
        <div>
          <label className="block">
            <span className="sr-only">عکس پروفایل خود را وارد کنید</span>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-500 dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
              name="profilePicture"
              id="profilePicture"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
            />
          </label>
        </div>
        <button
          disabled={formik.isSubmitting}
          type="submit"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-hidden focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
        >
          {formik.isSubmitting ? "در حال ثبت..." : "ثبت کاربر"}
        </button>
      </div>
    </Form>
  );
}
