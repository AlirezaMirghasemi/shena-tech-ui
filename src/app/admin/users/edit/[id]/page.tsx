"use client";

import UserForm from "@/components/admin/pages/users/UserForm";
import { useUsers } from "@/hooks/DB/useUsers";
import { UserFormValues } from "@/interfaces/models/IUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditUserPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { actions, isLoading } = useUsers();
  const [initialValues, setInitialValues] = useState<
    UserFormValues | undefined
  >(undefined);
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalMobile, setOriginalMobile] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { id } = await params;
      const user = await actions.getUserById(id);
      if (user.payload) {
        const userData = user.payload as UserFormValues;
        setInitialValues(userData);
        setOriginalUsername(userData.username);
        setOriginalEmail(userData.email);
        setOriginalMobile(userData.mobile);
      }
    };
    fetchUser();
  }, []);
  const handleSubmit = async (values: UserFormValues) => {
    const { id } = await params;
    if (!id) return;
    const success = await actions.updateUser(id, values);
    if (success) {
      toast.success("کاربر با موفقیت ویرایش شد");
      setTimeout(() => router.push("/admin/users"), 1000);
    }
  };
  if (!initialValues) return <div>در حال بارگذاری...</div>;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <UserForm
        initialValues={initialValues}
        originalUsername={originalUsername}
        originalEmail={originalEmail}
        originalMobile={originalMobile}
        title="ویرایش کاربر "
        description="اطلاعات کاربر را ویرایش نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
};
export default EditUserPage;
