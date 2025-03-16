import * as React from "react";
import FormHeader from "./FormHeader";
import { FormikProps } from "formik";
export default function Form({
  headerTitle,
  headerDescription,
  formik,
  children,
}: {
  headerTitle: string;
  headerDescription: string;
  formik: FormikProps<any>;
  children: React.ReactElement;
}): React.JSX.Element {
  return (
    <>
      <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="bg-blue-300 rounded-xl shadow-xs p-4 sm:p-7 dark:bg-neutral-900">
          <FormHeader title={headerTitle} description={headerDescription} />
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
            <form onSubmit={formik.handleSubmit}>{children}</form>
          </div>
        </div>
      </div>
    </>
  );
}
