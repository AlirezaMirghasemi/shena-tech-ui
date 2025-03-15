import { ITag } from "@/interfaces/models/ITag";
import { FormikConfig } from "formik";
import { tagInitial } from "../initials/tag.initial";
import { tagSchema } from "../schemas/tag.schema";
import { redirect } from "next/navigation";

export const tagConfig: FormikConfig<ITag> = {
  initialValues: tagInitial,
  validationSchema: tagSchema,
  onSubmit: (values: ITag) => {
    console.log("Submitted values:", values);
    redirect("/admin/tags");
  },
};
