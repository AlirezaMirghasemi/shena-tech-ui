"use client";
import TableHeader from "@/components/admin/layout/tables/viewAll/TableHeader";
import { InitialRolesTableHeader } from "./InitialRolePermissionsTableHeader";
import DynamicTable from "@/components/admin/layout/tables/viewAll/DynamicTable";
import { useMemo } from "react";
import { IDynamicTableColumn } from "@/interfaces/initials/admin/ViewTable/IDynamicTable";
import { FaCheck, FaX } from "react-icons/fa6";
import { IPermission } from "@/interfaces/models/IPermission";

export default function InitialRolePermissionsTable({
  permissions,
}: {
  permissions: IPermission[];
}) {
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
        width: "8%",
        cellRenderer: (permission: IPermission) =>
          new Date(permission.createdAt).toLocaleDateString("fa-IR"),
        ariaLabel: "تاریخ ایجاد مجوز",
      },
      {
        header: "تاریخ ویرایش",
        accessor: "updatedAt",
        align: "text-center",
        width: "8%",
        cellRenderer: (permission: IPermission) =>
          new Date(permission.updatedAt).toLocaleDateString("fa-IR"),
        ariaLabel: "تاریخ ویرایش مجوز",
      },
    ],
    []
  );

  //   const actions = useMemo(
  //     () => [
  //       {
  //         name: "edit",
  //         icon: <FaPencil className="w-5 h-5" />,
  //         handler: (role: IRole) => router.push(`/admin/roles/edit/${role.id}`),
  //         ariaLabel: "ویرایش نقش",
  //       },
  //       {
  //         name: "delete",
  //         icon: <FaTrash className="w-5 h-5 text-red-500" />,
  //         type: "button",
  //         className: "hover:bg-red-100 dark:hover:bg-red-900/20",
  //         ariaLabel: "حذف نقش",
  //         ariaControls: "confirmDeleteRole",
  //         ariaHasPopup: "dialog",
  //         handler: (row: IRole) => {
  //           if (row.id) {
  //             setDeletingItemId(row.id);
  //             setIsDeleteModalOpen(true);
  //           }
  //         },
  //       },
  //     ],
  //     [router]
  //   );
  //   {
  //     if (isLoading) return <LoadingSkeleton />;
  //   }
  return (
    <>
      <div className="container mx-auto p-4 space-y-6">
        <TableHeader tableHeader={InitialRolesTableHeader.tableHeader} />
        <DynamicTable
          data={permissions}
          columns={columns}
          //actions={actions}
          //loading={isLoading}
          //error={error}
          emptyState={
            <div className="flex flex-col items-center gap-4 py-8">
              <span className="text-lg text-gray-500">
                هیچ مجوزی برای این نقش یافت نشد
              </span>
            </div>
          }
          ariaLabel="جدول مدیریت تگ ها"
          rowKey="id"
        />
      </div>
    </>
  );
}
