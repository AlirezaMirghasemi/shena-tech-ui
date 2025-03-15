import { ITag } from "@/interfaces/models/ITag";
import { FormikConfig } from "formik";
import { tagInitial } from "../initials/tag.initial";
import { tagSchema } from "../schemas/tag.schema";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const tagConfig: FormikConfig<ITag> = {
  initialValues: tagInitial,
  validationSchema: tagSchema,
  onSubmit: (values: ITag) => {
    console.log("Submitted values:", values);
    toast.success("ذخیره هشتگ با موفقیت صورت گرفت")
    redirect("/admin/tags");
  },
};
