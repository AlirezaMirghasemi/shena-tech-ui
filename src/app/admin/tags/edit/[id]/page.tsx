"use client";

import RoleForm from "@/components/admin/pages/roles/RoleForm";
import { useRoles } from "@/hooks/DB/useRoles";
import { RoleFormValues } from "@/interfaces/models/IRole";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditRolePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { actions, isLoading } = useRoles();
  const [initialValues, setInitialValues] = useState<
    RoleFormValues | undefined
  >(undefined);
  const [originalTitle, setOriginalTitle] = useState("");
  useEffect(() => {
    const fetchRole = async () => {
      const { id } = await params;
      const role = await actions.getRoleById(id);
      if (role.payload) {
        const roleData = role.payload as RoleFormValues;
        setInitialValues(roleData);
        setOriginalTitle(roleData.title);
      }
    };
    fetchRole();
  }, []);
  const handleSubmit = async (values: RoleFormValues) => {
    const { id } = await params;
    if (!id) return;
    const success = await actions.updateRole(id, values);
    if (success) {
      toast.success("نقش با موفقیت ویرایش شد");
      setTimeout(() => router.push("/admin/roles"), 1000);
    }
  };
  if (!initialValues) return <div>در حال بارگذاری...</div>;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <RoleForm
        initialValues={initialValues}
        originalTitle={originalTitle}
        title="ویرایش نقش "
        description="اطلاعات نقش را ویرایش نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
};
export default EditRolePage;
