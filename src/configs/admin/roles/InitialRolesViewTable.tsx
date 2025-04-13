"use client";
import TableHeader from "@/components/admin/layout/tables/viewAll/TableHeader";
import { InitialRolesTableHeader } from "./InitialRolesViewTableHeader";
import DynamicTable from "@/components/admin/layout/tables/viewAll/DynamicTable";
import ConfirmDelete from "@/components/admin/layout/modal/ConfirmDelete";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IDynamicTableColumn } from "@/interfaces/initials/admin/ViewTable/IDynamicTable";
import { IRole } from "@/interfaces/models/IRole";
import { useRouter } from "next/navigation";
import { useRoles } from "@/hooks/DB/useRoles";
import { FaPencil, FaTrash } from "react-icons/fa6";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import Link from "next/link";
import { IPermission } from "@/interfaces/models/IPermission";




interface InitialRolesViewTableProps {
  fetchRolePermissions: (params: { roleId: string }) => Promise<IPermission[]>;
  setRolePermissions: (permissions: IPermission[]) => void;
}

export default function InitialRolesViewTable({ fetchRolePermissions, setRolePermissions }: InitialRolesViewTableProps) {
  const [deletingItemId, setDeletingItemId] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const {
    roles,
    isLoading,
    error,
    actions: { loadAllRoles, deleteRole },
    currentPage,
    totalPages,
  } = useRoles();



  const columns: IDynamicTableColumn<IRole>[] = useMemo(
    () => [
      {
        header: "عنوان",
        accessor: "title",
        sortable: true,
        width: "25%",
        align: "text-center",
        ariaLabel: "عنوان نقش",
        cellRenderer: (row) => (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            <Link
              href=""
              onClick={async (e) => {
                e.preventDefault();
                if (row.id) {
                  const permissions = await fetchRolePermissions({ roleId: row.id });
                  setRolePermissions(permissions);
                } else {
                  console.error("Row ID is undefined");
                }
              }}
            >
              {row.id}
            </Link>
          </span>
        ),
      },
      {
        header: "توضیحات",
        accessor: "description",
        sortable: true,
        width: "25%",
        align: "text-center",
        ariaLabel: "توضیحات نقش",
      },
      {
        header: "تاریخ ایجاد",
        accessor: "createdAt",
        align: "text-center",
        cellRenderer: (role: IRole) =>
          new Date(role.createdAt).toLocaleDateString("fa-IR"),
        ariaLabel: "تاریخ ایجاد نقش",
      },
    ],
    []
  );

  useEffect(() => {
    loadAllRoles();
  }, [loadAllRoles]);
  const handlePageChange = useCallback(
    (newPage: number | undefined) => {
      loadAllRoles(newPage);
    },
    [loadAllRoles]
  );
  const handleDelete = useCallback(
    async (roleId: string) => {
      if (!roleId) return;

      try {
        await deleteRole(roleId);
        await loadAllRoles();
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("خطا در حذف نقش:", error);
      } finally {
        setDeletingItemId("");
      }
    },
    [deleteRole, loadAllRoles]
  );

  const actions = useMemo(
    () => [
      {
        name: "edit",
        icon: <FaPencil className="w-5 h-5" />,
        handler: (role: IRole) => router.push(`/admin/roles/edit/${role.id}`),
        ariaLabel: "ویرایش نقش",
      },
      {
        name: "delete",
        icon: <FaTrash className="w-5 h-5 text-red-500" />,
        type: "button",
        className: "hover:bg-red-100 dark:hover:bg-red-900/20",
        ariaLabel: "حذف نقش",
        ariaControls: "confirmDeleteRole",
        ariaHasPopup: "dialog",
        handler: (row: IRole) => {
          if (row.id) {
            setDeletingItemId(row.id);
            setIsDeleteModalOpen(true);
          }
        },
      },
    ],
    [router]
  );
  {
    if (isLoading) return <LoadingSkeleton />;
  }
  return (
    <>
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        ariaControls="confirmDeleteRole"
        title="تایید حذف نقش"
        message="آیا از حذف این نقش اطمینان دارید؟"
        confirmHandler={handleDelete}
        deletedItemId={deletingItemId}
      />
      <div className="container mx-auto p-4 space-y-6">
        <TableHeader tableHeader={InitialRolesTableHeader.tableHeader} />
        <DynamicTable
          data={roles}
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
}
