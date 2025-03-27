"use client"

import SlugForm from "@/components/admin/pages/slugs/SlugForm";
import { useSlugs } from "@/hooks/DB/useSlugs";
import { SlugFormValues } from "@/interfaces/models/ISlug";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NewSlugPage = () => {
  const router = useRouter();
  const { actions, isLoading } = useSlugs();

  const handleSubmit = async (values: SlugFormValues) => {
    const success = await actions.createNewSlug(values);
    if (success) {
        toast.success("اسلاگ با موفقیت ایجاد شد");
        setTimeout(() => router.push("/admin/slugs"), 1000);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <SlugForm
        title="ایجاد اسلاگ جدید"
        description="اطلاعات اسلاگ جدید را وارد نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
};

export default NewSlugPage;
