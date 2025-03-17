"use client";
import Form from "@/components/admin/pages/Form";
import ValidatingError from "@/components/common/ValidatingError";
import { Gender } from "@/constants/data/Gender";
import { useAppDispatch } from "@/store/hooks";
import { userConfig } from "@/validations/configs/user.config";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function NewUserPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formik = useFormik(userConfig(router, dispatch));
  const [debouncedUsername] = useDebounce(formik.values.username, 500);
  const [debouncedEmail] = useDebounce(formik.values.email, 500);
  const [debouncedMobile] = useDebounce(formik.values.mobile, 500);
  useEffect(() => {
    formik.validateField("username");
  }, [debouncedUsername]);
  useEffect(() => {
    formik.validateField("email");
  }, [debouncedEmail]);
  useEffect(() => {
    formik.validateField("mobile");
  }, [debouncedMobile]);

  return (
    <>
      <Form
        headerTitle={"کاربر"}
        headerDescription={"افزودن کاربر جدید"}
        formik={formik}
      >
        <div className="max-w-sm space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            نام کاربری
          </label>
          <input
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="نام کاربری"
            className={`
                            py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                            ${
                              formik.touched.username && formik.errors.username
                                ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                                : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                            }
                            `}
          />
          {formik.touched.username && formik.errors.username ? (
            <ValidatingError error={formik.errors.username as string} />
          ) : (
            ""
          )}

          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            پست الکترونیکی
          </label>
          <input
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="پست الکترونیکی"
            className={`
                            py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                            ${
                              formik.touched.email && formik.errors.email
                                ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                                : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                            }
                            `}
          />
          {formik.touched.email && formik.errors.email ? (
            <ValidatingError error={formik.errors.email as string} />
          ) : (
            ""
          )}

          <label
            htmlFor="fullName"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            نام کامل{" "}
          </label>
          <input
            name="fullName"
            id="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="نام کامل"
            className={`
                            py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                            ${
                              formik.touched.fullName && formik.errors.fullName
                                ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                                : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                            }
                            `}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <ValidatingError error={formik.errors.fullName as string} />
          ) : (
            ""
          )}
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            رمز عبور
          </label>
          <input
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            placeholder="رمز عبور"
            className={`py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                            ${
                              formik.touched.password && formik.errors.password
                                ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                                : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                            }
                            `}
          />
          {formik.touched.password && formik.errors.password ? (
            <ValidatingError error={formik.errors.password as string} />
          ) : (
            ""
          )}

          <label
            htmlFor="mobile"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            شماره تلفن همراه{" "}
          </label>
          <input
            name="mobile"
            id="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="شماره تلفن همراه"
            className={`
                            py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                            ${
                              formik.touched.mobile && formik.errors.mobile
                                ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                                : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                            }
                            `}
          />
          {formik.touched.mobile && formik.errors.mobile ? (
            <ValidatingError error={formik.errors.mobile as string} />
          ) : (
            ""
          )}

          <label
            htmlFor="bio"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            درباره ی من
          </label>
          <textarea
            name="bio"
            id="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="درباره ی من"
            className={`
                            py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400
                            ${
                              formik.touched.bio && formik.errors.bio
                                ? "border-red-500   focus:border-red-500 focus:ring-red-500 dark:border-red-500"
                                : "border-teal-500  focus:border-teal-500 focus:ring-teal-500"
                            }
                            `}
          />
          {formik.touched.bio && formik.errors.bio ? (
            <ValidatingError error={formik.errors.bio as string} />
          ) : (
            ""
          )}

          <ul className="flex flex-col sm:flex-row">
            <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    id="NotSpecified"
                    name="gender"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    value={Gender.NotSpecified}
                    checked={formik.values.gender === Gender.NotSpecified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <label
                  htmlFor="NotSpecified"
                  className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                >
                  ترجیح میدهم نگویم
                </label>
              </div>
            </li>

            <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    value={Gender.Male}
                    checked={formik.values.gender === Gender.Male}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <label
                  htmlFor="male"
                  className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                >
                  مرد
                </label>
              </div>
            </li>

            <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    value={Gender.Female}
                    checked={formik.values.gender === Gender.Female}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <label
                  htmlFor="female"
                  className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                >
                  زن
                </label>
              </div>
            </li>
            {formik.touched.gender && formik.errors.gender ? (
              <ValidatingError error={formik.errors.gender as string} />
            ) : (
              ""
            )}
          </ul>

          <div className="max-w-sm">
            <label className="block">
              <span className="sr-only">عکس پروفایل خود را وارد کنید</span>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-500
        dark:hover:file:bg-blue-400
      "
                name="profilePicture"
                id="profilePicture"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    formik.setFieldValue("profilePicture", file);
                  }
                }}
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
    </>
  );
}
