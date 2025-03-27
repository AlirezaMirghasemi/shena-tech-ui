import * as React from "react";
import FormHeader from "./FormHeader";
import { Form } from "formik";
//import { FormikProps } from "formik";
export default function DynamicForm({
  headerTitle,
  headerDescription,
  children,
}: {
  headerTitle: string;
  headerDescription: string;
  children: React.ReactElement;
}): React.JSX.Element {
  return (
    <>
      <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="bg-blue-300 rounded-xl shadow-xs p-4 sm:p-7 dark:bg-neutral-900">
          <FormHeader title={headerTitle} description={headerDescription} />
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
            <Form>{children}</Form>
          </div>
        </div>
      </div>
    </>
  );
}
