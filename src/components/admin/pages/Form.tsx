import * as React from "react";
import FormHeader from "./FormHeader";
import { FormikProps } from 'formik';
export default function Form({
  headerTitle,
  headerDescription,
  formik,
  children,
}: {
  headerTitle: string;
  headerDescription: string;
  formik: FormikProps<unknown>["handleSubmit"]
  children: React.ReactElement;
}): React.JSX.Element {
  return (
    <>
      <FormHeader title={headerTitle} description={headerDescription} />
      <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
        <form onSubmit={formik}>{children}</form>
      </div>
    </>
  );
}
