"use client";

import TagForm from "@/components/admin/pages/tags/TagForm";
import { useTags } from "@/hooks/DB/useTags";
import { TagFormValues } from "@/interfaces/models/ITag";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NewTagPage = () => {
  const router = useRouter();
  const { actions, isLoading } = useTags();

  const handleSubmit = async (values: TagFormValues) => {
    const success = await actions.createNewTag(values);
    if (success) {
      toast.success("هشتگ با موفقیت ایجاد شد");
      setTimeout(() => router.push("/admin/tags"), 1000);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <TagForm
        title="ایجاد هشتگ جدید"
        description="اطلاعات هشتگ جدید را وارد نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
};

export default NewTagPage;
