"use client";

import SlugForm from "@/components/admin/pages/slugs/SlugForm";
import { useSlugs } from "@/hooks/DB/useSlugs";
import { SlugFormValues } from "@/interfaces/models/ISlug";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditSlugPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { actions, isLoading } = useSlugs();
  const [initialValues, setInitialValues] = useState<SlugFormValues | undefined>(
    undefined
  );
  const [originalPersianTitle, setOriginalPersianTitle] = useState("");
  const [originalEnglishTitle, setOriginalEnglishTitle] = useState("");

  useEffect(() => {
    const fetchSlug = async () => {
      const { id } = await params;
      const slug = await actions.getSlugById(id);
      if (slug.payload) {
        const slugData = slug.payload as SlugFormValues;
        setInitialValues(slugData);
        setOriginalPersianTitle(slugData.titlePersian);
        setOriginalEnglishTitle(slugData.titleEnglish);
      }
    };
    fetchSlug();
  }, []);
  const handleSubmit = async (values: SlugFormValues) => {
    const { id } = await params;
    if (!id) return;
    const success = await actions.updateSlug(id, values);
    if (success) {
      toast.success("اسلاگ با موفقیت ویرایش شد");
      setTimeout(() => router.push("/admin/slugs"), 1000);
    }
  };
  if (!initialValues) return <div>در حال بارگذاری...</div>;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <SlugForm
        initialValues={initialValues}
        originalPersianTitle={originalPersianTitle}
        originalEnglishTitle={originalEnglishTitle}
        title="ویرایش اسلاگ "
        description="اطلاعات اسلاگ را ویرایش نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
};
export default EditSlugPage;
