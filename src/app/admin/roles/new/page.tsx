"use client"

import RoleForm from "@/components/admin/pages/roles/RoleForm";
import { useRoles } from "@/hooks/DB/useRoles";
import { RoleFormValues } from "@/interfaces/models/IRole";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NewRolePage = () => {
  const router = useRouter();
  const { actions, isLoading } = useRoles();

  const handleSubmit = async (values: RoleFormValues) => {
    const success = await actions.createNewRole(values);
    if (success) {
        toast.success("نقش با موفقیت ایجاد شد");
        setTimeout(() => router.push("/admin/roles"), 1000);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <RoleForm
        title="ایجاد نقش جدید"
        description="اطلاعات نقش جدید را وارد نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
};

export default NewRolePage;
