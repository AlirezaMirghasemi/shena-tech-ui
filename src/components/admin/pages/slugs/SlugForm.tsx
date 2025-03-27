import { Formik, useFormikContext } from "formik";
import DynamicForm from "../DynamicForm";
import InputField from "../InputField";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { slugInitial } from "@/validations/initials/slug.initial";
import { slugSchema } from "@/validations/schemas/slug.schema";
import { SlugFormValues } from "@/interfaces/models/ISlug";

interface SlugFormProps {
  initialValues?: SlugFormValues;
  onSubmit: (values: SlugFormValues) => Promise<void>;
  isSubmitting: boolean;
  title: string;
  description: string;
}

const DebouncedValidation = () => {
  const { values, validateField } = useFormikContext<SlugFormValues>();
  const [debouncedTitlePersian] = useDebounce(values.titlePersian, 500);
  const [debouncedTitleEnglish] = useDebounce(values.titleEnglish, 500);

  useEffect(() => {
    validateField("titlePersian");
  }, [debouncedTitlePersian, validateField]);

  useEffect(() => {
    validateField("titleEnglish");
  }, [debouncedTitleEnglish, validateField]);

  return null;
};

export default function SlugForm({
  initialValues = slugInitial,
  onSubmit,
  isSubmitting,
  title,
  description,
}: SlugFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={slugSchema}
      validateOnChange={false}
    >
      <DynamicForm headerTitle={title} headerDescription={description}>
        <div className="max-w-sm space-y-2">
          <DebouncedValidation />
          <InputField
            id={"titlePersian"}
            name={"titlePersian"}
            placeholder={"عنوان فارسی اسلاگ"}
            disabled={isSubmitting}
          />
          <InputField
            id={"titleEnglish"}
            name={"titleEnglish"}
            placeholder={"عنوان انگلیسی اسلاگ"}
            disabled={isSubmitting}
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-hidden focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
          >
            {isSubmitting ? "در حال ثبت ..." : "ذخیره اسلاگ"}
          </button>
        </div>
      </DynamicForm>
    </Formik>
  );
}
