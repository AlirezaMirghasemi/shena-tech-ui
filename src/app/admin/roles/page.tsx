"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPencil, FaTrash } from "react-icons/fa6";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { useRoles } from "@/hooks/DB/useRoles";
import type { IRole } from "@/interfaces/models/IRole";
import { InitialViewTable } from "@/configs/admin/roles/InitialViewTable";
import TableHeader from "@/components/admin/layout/tables/viewAll/TableHeader";
import DynamicTable from "@/components/admin/layout/tables/viewAll/DynamicTable";
import { IDynamicTableColumn } from "@/interfaces/initials/admin/ViewTable/IDynamicTable";
import ConfirmDelete from "@/components/admin/layout/modal/ConfirmDelete";

const RolesPage = () => {
  const [deletingItemId, setDeletingItemId] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const {
    roles,
    isLoading,
    error,
    actions: { loadAllRoles, deleteRole },
  } = useRoles();

  useEffect(() => {
    loadAllRoles();
  }, []);

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

  const columns = useMemo<IDynamicTableColumn<IRole>[]>(
    () => [
      {
        header: "عنوان",
        accessor: "title",
        sortable: true,
        width: "25%",
        align: "text-center",
        ariaLabel: "عنوان نقش",
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
  if (isLoading) return <LoadingSkeleton />;
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
        <TableHeader tableHeader={InitialViewTable.tableHeader} />
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
          ariaLabel="جدول مدیریت نقش ها"
          rowKey="id"
        />
      </div>
      <nav
        className="relative z-0 flex border border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700"
        aria-label="Tabs"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button
          type="button"
          className="hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 border-gray-200 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 active"
          id="bar-with-underline-item-1"
          aria-selected="true"
          data-hs-tab="#bar-with-underline-1"
          aria-controls="bar-with-underline-1"
          role="tab"
        >
          مجوز ها
        </button>
        <button
          type="button"
          className="hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 border-gray-200 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
          id="bar-with-underline-item-2"
          aria-selected="false"
          data-hs-tab="#bar-with-underline-2"
          aria-controls="bar-with-underline-2"
          role="tab"
        >
          کاربران
        </button>
      </nav>

      <div className="mt-3">
        <div
          id="bar-with-underline-1"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-1"
        >
          <h3 className="">جدول مجوز های نقش انتخاب شده</h3>
        </div>
        <div
          id="bar-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-2"
        >
          <h3 className="">جدول کاربران نقش انتخاب شده</h3>
        </div>
      </div>
    </>
  );
};

export default RolesPage;
