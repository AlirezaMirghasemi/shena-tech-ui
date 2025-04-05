"use client";

import TagForm from "@/components/admin/pages/tags/TagForm";
import { useTags } from "@/hooks/DB/useTags";
import { TagFormValues } from "@/interfaces/models/ITag";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditTagPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { actions, isLoading } = useTags();
  const [initialValues, setInitialValues] = useState<TagFormValues | undefined>(
    undefined
  );
  const [originalPersianTitle, setOriginalPersianTitle] = useState("");
  const [originalEnglishTitle, setOriginalEnglishTitle] = useState("");

  useEffect(() => {
    const fetchTag = async () => {
      const { id } = await params;
      const tag = await actions.getTagById(id);
      if (tag.payload) {
        const tagData = tag.payload as TagFormValues;
        setInitialValues(tagData);
        setOriginalPersianTitle(tagData.titlePersian);
        setOriginalEnglishTitle(tagData.titleEnglish);
      }
    };
    fetchTag();
  }, []);
  const handleSubmit = async (values: TagFormValues) => {
    const { id } = await params;
    if (!id) return;
    const success = await actions.updateTag(id, values);
    if (success) {
      toast.success("هشتگ با موفقیت ویرایش شد");
      setTimeout(() => router.push("/admin/tags"), 1000);
    }
  };
  if (!initialValues) return <div>در حال بارگذاری...</div>;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <TagForm
        initialValues={initialValues}
        originalPersianTitle={originalPersianTitle}
        originalEnglishTitle={originalEnglishTitle}
        title="ویرایش هشتگ "
        description="اطلاعات هشتگ را ویرایش نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
};
export default EditTagPage;
