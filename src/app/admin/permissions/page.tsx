"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheck, FaPencil, FaTrash, FaX } from "react-icons/fa6";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { usePermissions } from "@/hooks/DB/usePermissions";
import type { IPermission } from "@/interfaces/models/IPermission";
import { InitialViewTable } from "@/configs/admin/permissions/InitialViewTable";
import TableHeader from "@/components/admin/layout/tables/viewAll/TableHeader";
import DynamicTable from "@/components/admin/layout/tables/viewAll/DynamicTable";
import { IDynamicTableColumn } from "@/interfaces/initials/admin/ViewTable/IDynamicTable";
import ConfirmDelete from "@/components/admin/layout/modal/ConfirmDelete";

const PermissionsPage = () => {
  const [deletingItemId, setDeletingItemId] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const {
    permissions,
    isLoading,
    error,
    actions: { loadAllPermissions, deletePermission },
    currentPage,
    totalPages,
  } = usePermissions();

  useEffect(() => {
    loadAllPermissions();
  }, []);
  const handlePageChange = useCallback(
    (newPage: number | undefined) => {
      loadAllPermissions(newPage);
    },
    [loadAllPermissions]
  );
  const handleDelete = useCallback(
    async (permissionId: string) => {
      if (!permissionId) return;

      try {
        await deletePermission(permissionId);
        await loadAllPermissions();
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("خطا در حذف مجوز:", error);
      } finally {
        setDeletingItemId("");
      }
    },
    [deletePermission, loadAllPermissions]
  );

  const columns = useMemo<IDynamicTableColumn<IPermission>[]>(
    () => [
      {
        header: "موجودیت",
        accessor: "entity",
        sortable: true,
        width: "10%",
        align: "text-center",
        ariaLabel: "موجودیت",
      },
      {
        header: "توضیحات",
        accessor: "description",
        sortable: true,
        width: "25%",
        align: "text-center",
        ariaLabel: "توضیحات",
      },
      {
        header: "ایجاد",
        accessor: "create",
        sortable: true,
        width: "5%",
        align: "text-center",
        ariaLabel: "مجوز ایجاد",
        cellRenderer: (row) =>
          row.create ? (
            <FaCheck className="text-green-500 mx-auto" />
          ) : (
            <FaX className="text-red-500 mx-auto" />
          ),
      },
      {
        header: "ویرایش",
        accessor: "edit",
        sortable: true,
        width: "5%",
        align: "text-center",
        ariaLabel: "مجوز ویرایش",
        cellRenderer: (row) =>
          row.edit ? (
            <FaCheck className="text-green-500 mx-auto" />
          ) : (
            <FaX className="text-red-500 mx-auto" />
          ),
      },
      {
        header: "حذف",
        accessor: "delete",
        sortable: true,
        width: "5%",
        align: "text-center",
        ariaLabel: "مجوز حذف",
        cellRenderer: (row) =>
          row.delete ? (
            <FaCheck className="text-green-500 mx-auto" />
          ) : (
            <FaX className="text-red-500 mx-auto" />
          ),
      },
      {
        header: "مشاهده",
        accessor: "read",
        sortable: true,
        width: "5%",
        align: "text-center",
        ariaLabel: "مجوز مشاهده",
        cellRenderer: (row) =>
          row.read ? (
            <FaCheck className="text-green-500 mx-auto" />
          ) : (
            <FaX className="text-red-500 mx-auto" />
          ),
      },
      {
        header: "تغییر وضعیت",
        accessor: "statusEdit",
        sortable: true,
        width: "10%",
        align: "text-center",
        ariaLabel: "مجوز تغییر وضعیت",
        cellRenderer: (row) =>
          row.statusEdit ? (
            <FaCheck className="text-green-500 mx-auto" />
          ) : (
            <FaX className="text-red-500 mx-auto" />
          ),
      },
      {
        header: "دسترسی",
        accessor: "creator",
        sortable: true,
        width: "5%",
        align: "text-center",
        ariaLabel: "دسترسی",
        cellRenderer: (row) => (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {row.creator === "self" ? "خودش" : "همه"}
          </span>
        ),
      },
      {
        header: "تاریخ ایجاد",
        accessor: "createdAt",
        align: "text-center",
        width:"8%",
        cellRenderer: (permission: IPermission) =>
          new Date(permission.createdAt).toLocaleDateString("fa-IR"),
        ariaLabel: "تاریخ ایجاد مجوز",
      },{
        header: "تاریخ ویرایش",
        accessor: "updatedAt",
        align: "text-center",
        width:"8%",
        cellRenderer: (permission: IPermission) =>
          new Date(permission.updatedAt).toLocaleDateString("fa-IR"),
        ariaLabel: "تاریخ ویرایش مجوز",
      },
    ],
    []
  );

  const actions = useMemo(
    () => [
      {
        name: "edit",
        icon: <FaPencil className="w-5 h-5" />,
        handler: (permission: IPermission) =>
          router.push(`/admin/permissions/edit/${permission.id}`),
        ariaLabel: "ویرایش مجوز",
      },
      {
        name: "delete",
        icon: <FaTrash className="w-5 h-5 text-red-500" />,
        type: "button",
        className: "hover:bg-red-100 dark:hover:bg-red-900/20",
        ariaLabel: "حذف مجوز",
        ariaControls: "confirmDeletePermission",
        ariaHasPopup: "dialog",
        handler: (row: IPermission) => {
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
        ariaControls="confirmDeletePermission"
        title="تایید حذف مجوز"
        message="آیا از حذف این مجوز اطمینان دارید؟"
        confirmHandler={handleDelete}
        deletedItemId={deletingItemId}
      />
      <div className="container mx-auto p-4 space-y-6">
        <TableHeader tableHeader={InitialViewTable.tableHeader} />

        <DynamicTable
          data={permissions}
          columns={columns}
          actions={actions}
          loading={isLoading}
          error={error}
          emptyState={
            <div className="flex flex-col items-center gap-4 py-8">
              <span className="text-lg text-gray-500">هیچ نقشی یافت نشد</span>
            </div>
          }
          ariaLabel="جدول مدیریت تگ ها"
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

export default PermissionsPage;
