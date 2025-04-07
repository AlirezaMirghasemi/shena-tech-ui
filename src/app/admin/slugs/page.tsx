"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPencil, FaTrash } from "react-icons/fa6";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { useSlugs } from "@/hooks/DB/useSlugs";
import type { ISlug } from "@/interfaces/models/ISlug";
import { InitialViewTable } from "@/configs/admin/slugs/InitialViewTable";
import TableHeader from "@/components/admin/layout/tables/viewAll/TableHeader";
import DynamicTable from "@/components/admin/layout/tables/viewAll/DynamicTable";
import { IDynamicTableColumn } from "@/interfaces/initials/admin/ViewTable/IDynamicTable";
import ConfirmDelete from "@/components/admin/layout/modal/ConfirmDelete";

const SlugsPage = () => {
  const [deletingItemId, setDeletingItemId] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const {
    slugs,
    isLoading,
    error,
    actions: { loadAllSlugs, deleteSlug },
    currentPage,
    totalPages,
  } = useSlugs();

  useEffect(() => {
    loadAllSlugs();
  }, []);
  const handlePageChange = useCallback(
    (newPage: number | undefined) => {
      loadAllSlugs(newPage);
    },
    [loadAllSlugs]
  );
  const handleDelete = useCallback(
    async (slugId: string) => {
      if (!slugId) return;

      try {
        await deleteSlug(slugId);
        await loadAllSlugs();
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("خطا در حذف اسلاگ:", error);
      } finally {
        setDeletingItemId("");
      }
    },
    [deleteSlug, loadAllSlugs]
  );

  const columns = useMemo<IDynamicTableColumn<ISlug>[]>(
    () => [
      {
        header: "عنوان فارسی",
        accessor: "titlePersian",
        sortable: true,
        width: "25%",
        align: "text-center",
        ariaLabel: "عنوان فارسی اسلاگ",
      },
      {
        header: "عنوان انگلیسی",
        accessor: "titleEnglish",
        sortable: true,
        width: "25%",
        align: "text-center",
        ariaLabel: "عنوان انگلیسی اسلاگ",
      },
      {
        header: "تاریخ ایجاد",
        accessor: "createdAt",
        align: "text-center",
        cellRenderer: (slug: ISlug) =>
          new Date(slug.createdAt).toLocaleDateString("fa-IR"),
        ariaLabel: "تاریخ ایجاد اسلاگ",
      },
    ],
    []
  );

  const actions = useMemo(
    () => [
      {
        name: "edit",
        icon: <FaPencil className="w-5 h-5" />,
        handler: (slug: ISlug) => router.push(`/admin/slugs/edit/${slug.id}`),
        ariaLabel: "ویرایش اسلاگ",
      },
      {
        name: "delete",
        icon: <FaTrash className="w-5 h-5 text-red-500" />,
        type: "button",
        className: "hover:bg-red-100 dark:hover:bg-red-900/20",
        ariaLabel: "حذف اسلاگ",
        ariaControls: "confirmDeleteSlug",
        ariaHasPopup: "dialog",
        handler: (row: ISlug) => {
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
        ariaControls="confirmDeleteSlug"
        title="تایید حذف اسلاگ"
        message="آیا از حذف این اسلاگ اطمینان دارید؟"
        confirmHandler={handleDelete}
        deletedItemId={deletingItemId}
      />
      <div className="container mx-auto p-4 space-y-6">
        <TableHeader tableHeader={InitialViewTable.tableHeader} />

        <DynamicTable
          data={slugs}
          columns={columns}
          actions={actions}
          loading={isLoading}
          error={error}
          emptyState={
            <div className="flex flex-col items-center gap-4 py-8">
              <span className="text-lg text-gray-500">هیچ اسلاگی یافت نشد</span>
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

export default SlugsPage;
