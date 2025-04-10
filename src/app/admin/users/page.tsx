"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPencil, FaTrash } from "react-icons/fa6";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { useUsers } from "@/hooks/DB/useUsers";
import type { IUser } from "@/interfaces/models/IUser";
import { InitialViewTable } from "@/configs/admin/users/InitialViewTable";
import TableHeader from "@/components/admin/layout/tables/viewAll/TableHeader";
import DynamicTable from "@/components/admin/layout/tables/viewAll/DynamicTable";
import { IDynamicTableColumn } from "@/interfaces/initials/admin/ViewTable/IDynamicTable";
import ConfirmDelete from "@/components/admin/layout/modal/ConfirmDelete";
const UsersPage = () => {
  const [deletingItemId, setDeletingItemId] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const {
    users,
    isLoading,
    error,
    actions: { loadAllUsers, deleteUser },
    currentPage,
    totalPages,
  } = useUsers();
  useEffect(() => {
    loadAllUsers();
  }, []);
  const handlePageChange = useCallback(
    (newPage: number | undefined) => {
      loadAllUsers(newPage);
    },
    [loadAllUsers]
  );
  const handleDelete = useCallback(
    async (userId: string) => {
      if (!userId) return;
      try {
        await deleteUser(userId);
        await loadAllUsers();
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("خطا در حذف کاربر:", error);
      } finally {
        setDeletingItemId("");
      }
    },
    [deleteUser, loadAllUsers]
  );

  const columns = useMemo<IDynamicTableColumn<IUser>[]>(
    () => [
      {
        header: "نام کاربری",
        accessor: "username",
        sortable: true,
        width: "10%",
        align: "text-center",
        ariaLabel: "نام کاربری",
      },
      {
        header: "پست الکترونیکی",
        accessor: "email",
        sortable: true,
        width: "25%",
        align: "text-center",
        ariaLabel: "پست الکترونیکی",
      },
      {
        header: "تاریخ ایجاد",
        accessor: "createdAt",
        align: "text-center",
        cellRenderer: (user: IUser) =>
          new Date(user.createdAt).toLocaleDateString("fa-IR"),
        ariaLabel: "تاریخ ایجاد کاربر",
      },
    ],
    []
  );

  const actions = useMemo(
    () => [
      {
        name: "edit",
        icon: <FaPencil className="w-5 h-5" />,
        handler: (user: IUser) => router.push(`/admin/users/edit/${user.id}`),
        ariaLabel: "ویرایش کاربر",
      },
      {
        name: "delete",
        icon: <FaTrash className="w-5 h-5 text-red-500" />,
        type: "button",
        className: "hover:bg-red-100 dark:hover:bg-red-900/20",
        ariaLabel: "حذف کاربر",
        ariaControls: "confirmDeleteUser",
        ariaHasPopup: "dialog",
        handler: (row: IUser) => {
          if (row.id) {
            setDeletingItemId(row.id);
            setIsDeleteModalOpen(true);
          }
        },
      },
    ],
    [router]
  );

  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        ariaControls="confirmDeleteUser"
        title="تایید حذف کاربر"
        message="آیا از حذف این کاربر اطمینان دارید؟"
        confirmHandler={handleDelete}
        deletedItemId={deletingItemId}
      />
      <div className="container mx-auto p-4 space-y-6">
        <TableHeader tableHeader={InitialViewTable.tableHeader} />
        <DynamicTable
          data={users}
          columns={columns}
          actions={actions}
          loading={isLoading}
          error={error}
          emptyState={
            <div className="flex flex-col items-center gap-4 py-8">
              <span className="text-lg text-gray-500">هیچ کاربری یافت نشد</span>
            </div>
          }
          ariaLabel="جدول مدیریت کاربر ها"
          rowKey="id"
          pagination={{
            currentPage,
            totalPages,
            onPageChange: handlePageChange,
          }}
        />
      </div>
    </>
  );
};

export default UsersPage;
