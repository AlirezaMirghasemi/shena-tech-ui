"use client";

import PermissionForm from "@/components/admin/pages/permissions/PermissionForm";
import { usePermissions } from "@/hooks/DB/usePermissions";
import { PermissionFormValues } from "@/interfaces/models/IPermission";
import { permissionInitial } from "@/validations/initials/permission.initial";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NewPermissionPage = () => {
  const router = useRouter();
  const { actions, isLoading } = usePermissions();

  const handleSubmit = async (values: PermissionFormValues) => {
    const success = await actions.createNewPermission(values);
    if (success) {
      toast.success("مجوز با موفقیت ایجاد شد");
      setTimeout(() => router.push("/admin/permissions"), 1000);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <PermissionForm
        title="ایجاد مجوز جدید"
        description="اطلاعات مجوز جدید را وارد نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        initialValues={permissionInitial}
      />
    </div>
  );
};

export default NewPermissionPage;
