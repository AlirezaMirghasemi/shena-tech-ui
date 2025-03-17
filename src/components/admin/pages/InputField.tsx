import ValidatingError from "@/components/common/ValidatingError";
import { getInputClass } from "@/constants/theme/InputClass";

export default function InputField({
  id,
  name,
  type = "text",
  placeholder,
  formik,
}: {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  formik: any;
}) {

  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        className={getInputClass(formik.touched[name], formik.errors[name])}
      />
      {formik.touched[name] && formik.errors[name] && (
        <ValidatingError error={formik.errors[name] as string} />
      )}
    </>
  );
}
