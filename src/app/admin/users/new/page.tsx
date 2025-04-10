"use client";

import UserForm from "@/components/admin/pages/users/UserForm";
import { useUsers } from "@/hooks/DB/useUsers";
import { UserFormValues } from "@/interfaces/models/IUser";
import { userInitial } from "@/validations/initials/user.initial";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NewUserPage = () => {
  const router = useRouter();
  const { actions, isLoading } = useUsers();

  const handleSubmit = async (values: UserFormValues) => {
    const success = await actions.createNewUser(values);
    if (success) {
      toast.success("کاربر با موفقیت ایجاد شد");
      setTimeout(() => router.push("/admin/users"), 1000);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <UserForm
        title="ایجاد کاربر جدید"
        description="اطلاعات کاربر جدید را وارد نمایید"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        initialValues={userInitial}
      />
    </div>
  );
};

export default NewUserPage;
