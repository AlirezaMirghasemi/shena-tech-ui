import { TagFormValues } from "@/interfaces/models/ITag";
import { tagInitial } from "@/validations/initials/tag.initial";
import { tagSchema } from "@/validations/schemas/tag.schema";
import { Formik, useFormikContext } from "formik";
import DynamicForm from "../DynamicForm";
import InputField from "../InputField";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";

interface TagFormProps {
  initialValues: TagFormValues;
  onSubmit: (values: TagFormValues) => Promise<void>;
  isSubmitting: boolean;
  title: string;
  description: string;
  originalPersianTitle?: string;
  originalEnglishTitle?: string;

}

const DebouncedValidation = () => {
  const { values, validateField } = useFormikContext<TagFormValues>();
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

export default function TagForm({
  initialValues = tagInitial,
  originalPersianTitle,
  originalEnglishTitle,
  onSubmit,
  isSubmitting,
  title,
  description,
}: TagFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={tagSchema(originalEnglishTitle,originalPersianTitle)}
      validateOnChange={false}
    >
      <DynamicForm headerTitle={title} headerDescription={description}>
        <div className="max-w-sm space-y-2">
          <DebouncedValidation />
          <InputField
            id={"titlePersian"}
            name={"titlePersian"}
            placeholder={"عنوان فارسی هشتگ"}
            disabled={isSubmitting}
          />
          <InputField
            id={"titleEnglish"}
            name={"titleEnglish"}
            placeholder={"عنوان انگلیسی هشتگ"}
            disabled={isSubmitting}
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-hidden focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
          >
            {isSubmitting ? "در حال ثبت ..." : "ذخیره هشتگ"}
          </button>
        </div>
      </DynamicForm>
    </Formik>
  );
}
