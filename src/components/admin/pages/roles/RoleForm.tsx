import { Formik, useFormikContext } from "formik";
import DynamicForm from "../DynamicForm";
import InputField from "../InputField";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { roleInitial } from "@/validations/initials/role.initial";
import { roleSchema } from "@/validations/schemas/role.schema";
import { RoleFormValues } from "@/interfaces/models/IRole";

interface RoleFormProps {
  initialValues: RoleFormValues;
  onSubmit: (values: RoleFormValues) => Promise<void>;
  originalTitle?: string;
  isSubmitting: boolean;
  title: string;
  description: string;
}

const DebouncedValidation = () => {
  const { values, validateField } = useFormikContext<RoleFormValues>();
  const [debouncedTitle] = useDebounce(values.title, 500);

  useEffect(() => {
    validateField("title");
  }, [debouncedTitle, validateField]);
  return null;
};

export default function RoleForm({
  initialValues = roleInitial,
  originalTitle,
  onSubmit,
  isSubmitting,
  title,
  description,
}: RoleFormProps) {
    console.log(initialValues)
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={roleSchema(originalTitle)}
      validateOnChange={false}
    >
      <DynamicForm headerTitle={title} headerDescription={description}>
        <div className="max-w-sm space-y-2">
          <DebouncedValidation />
          <InputField
            id={"title"}
            name={"title"}
            placeholder={"عنوان نقش"}
            disabled={isSubmitting}
          />
          <InputField
            id={"description"}
            name={"description"}
            placeholder={"توضیحات"}
            as="textarea"
            disabled={isSubmitting}
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-hidden focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
          >
            {isSubmitting ? "در حال ثبت ..." : "ذخیره نقش"}
          </button>
        </div>
      </DynamicForm>
    </Formik>
  );
}
