import ValidatingError from "@/components/common/ValidatingError";
import { ErrorMessage, Field } from "formik";

export default function InputField({
  id,
  name,
  type = "input",
  placeholder,
  disabled,

}: {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  disabled:boolean

}) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {placeholder}
      </label>
      <Field
        id={id}
        name={name}
        as={type}
        disabled={disabled}
        placeholder={placeholder}
        className="py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 border-teal-500 focus:border-teal-500 focus:ring-teal-500"

      />
      <ErrorMessage name={name} >
         {message=><ValidatingError error={message} />}
      </ErrorMessage>
    </>
  );
}
