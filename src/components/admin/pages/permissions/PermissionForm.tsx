import { PermissionFormValues } from "@/interfaces/models/IPermission";
import { permissionInitial } from "@/validations/initials/permission.initial";
import { permissionSchema } from "@/validations/schemas/permission.schema";
import { Formik } from "formik";
import DynamicForm from "../DynamicForm";
import InputField from "../InputField";
import { Entity } from "../../../../constants/data/Entity";
import { Creator } from "@/constants/data/Creator";

interface PermissionFormProps {
  initialValues?: PermissionFormValues;
  onSubmit: (values: PermissionFormValues) => Promise<void>;
  isSubmitting: boolean;
  title: string;
  description: string;
}

export default function PermissionForm({
  initialValues = permissionInitial,
  onSubmit,
  isSubmitting,
  title,
  description,
}: PermissionFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={permissionSchema}
      validateOnChange={false}
    >
      <DynamicForm headerTitle={title} headerDescription={description}>
        <div className="max-w-sm space-y-2">
          <InputField
            id={"entity"}
            name={"entity"}
            as="select"
            data={Object.values(Entity)}
            placeholder={"عنوان موجودیت"}
            disabled={isSubmitting}
          />
          <div className="flex gap-x-6">
            <div className="flex">
              <InputField
                id={"create"}
                name={"create"}
                placeholder={"ایجاد"}
                type="checkbox"
                disabled={isSubmitting}
                className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                labelClassName="text-sm text-gray-500 ms-3 me-3 dark:text-neutral-400"
              />
            </div>
            <div className="flex">
              <InputField
                id={"edit"}
                name={"edit"}
                placeholder={"ویرایش"}
                type="checkbox"
                disabled={isSubmitting}
                className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                labelClassName="text-sm text-gray-500 ms-3 me-3 dark:text-neutral-400"
              />
            </div>
            <div className="flex">
              <InputField
                id={"delete"}
                name={"delete"}
                placeholder={"حذف"}
                type="checkbox"
                disabled={isSubmitting}
                className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                labelClassName="text-sm text-gray-500 ms-3 me-3 dark:text-neutral-400"
              />
            </div>

            <div className="flex">
              <InputField
                id={"read"}
                name={"read"}
                placeholder={"مشاهده"}
                type="checkbox"
                disabled={isSubmitting}
                className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                labelClassName="text-sm text-gray-500 ms-3 me-3 dark:text-neutral-400"
              />
            </div>

          </div>
          <div className="flex">
              <InputField
                id={"statusEdit"}
                name={"statusEdit"}
                placeholder={"تغییر وضعیت"}
                type="checkbox"
                disabled={isSubmitting}
                className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                labelClassName="text-sm text-gray-500 ms-3 me-3 dark:text-neutral-400"
              />
            </div>
          <InputField
            id={"creator"}
            name={"creator"}
            as="select"
            data={Object.values(Creator)}
            placeholder={"دسترسی"}
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
            {isSubmitting ? "در حال ثبت ..." : "ذخیره مجوز"}
          </button>
        </div>
      </DynamicForm>
    </Formik>
  );
}
