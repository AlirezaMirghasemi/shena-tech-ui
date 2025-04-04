"use client";

import PermissionForm from "@/components/admin/pages/permissions/PermissionForm";
import { usePermissions } from "@/hooks/DB/usePermissions";
import { PermissionFormValues } from "@/interfaces/models/IPermission";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditPermissionPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const router = useRouter();
  const { actions, isLoading } = usePermissions();
  const [initialValues, setInitialValues] = useState<
    PermissionFormValues | undefined
  >(undefined);
  useEffect(() => {
    const fetchPermission = async () => {
      const { id } = await params;
      const permission = await actions.getPermissionById(id);
      if (permission.payload) {
        const permissionData = permission.payload as PermissionFormValues;
        setInitialValues(permissionData);
      }
    };
    fetchPermission();
  }, []);
  const handleSubmit = async (values: PermissionFormValues) => {
    const { id } = await params;
    if (!id) return;
    const success = await actions.updatePermission(id, values);
    if (success) {
      toast.success("مجوز با موفقیت ویرایش شد");
      setTimeout(() => router.push("/admin/permissions"), 1000);
    }
  };
  if (!initialValues) return <div>در حال بارگذاری...</div>;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <PermissionForm
        initialValues={initialValues}
        title="ویرایش مجوز "
        description="اطلاعات مجوز را ویرایش نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
};
export default EditPermissionPage;
