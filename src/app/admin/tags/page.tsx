"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPencil, FaTrash } from "react-icons/fa6";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { useTags } from "@/hooks/DB/useTags";
import type { ITag } from "@/interfaces/models/ITag";
import { InitialViewTable } from "@/configs/admin/tags/InitialViewTable";
import TableHeader from "@/components/admin/layout/tables/viewAll/TableHeader";
import DynamicTable from "@/components/admin/layout/tables/viewAll/DynamicTable";
import { IDynamicTableColumn } from "@/interfaces/initials/admin/ViewTable/IDynamicTable";
import ConfirmDelete from "@/components/admin/layout/modal/ConfirmDelete";

const TagsPage = () => {
  const [deletingItemId, setDeletingItemId] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const {
    tags,
    isLoading,
    error,
    actions: { loadAllTags, deleteTag },
  } = useTags();

  useEffect(() => {
    loadAllTags();
  }, []);

  const handleDelete = useCallback(
    async (tagId: string) => {
      if (!tagId) return;

      try {
        await deleteTag(tagId);
        await loadAllTags();
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("خطا در حذف هشتگ:", error);
      } finally {
        setDeletingItemId("");
      }
    },
    [deleteTag, loadAllTags]
  );

  const columns = useMemo<IDynamicTableColumn<ITag>[]>(
    () => [
      {
        header: "عنوان فارسی",
        accessor: "titlePersian",
        sortable: true,
        width: "25%",
        align: "text-center",
        ariaLabel: "عنوان فارسی تگ",
      },
      {
        header: "عنوان انگلیسی",
        accessor: "titleEnglish",
        sortable: true,
        width: "25%",
        align: "text-center",
        ariaLabel: "عنوان انگلیسی تگ",
      },
      {
        header: "تاریخ ایجاد",
        accessor: "createdAt",
        align: "text-center",
        cellRenderer: (tag: ITag) =>
          new Date(tag.createdAt).toLocaleDateString("fa-IR"),
        ariaLabel: "تاریخ ایجاد تگ",
      },
    ],
    []
  );

  const actions = useMemo(
    () => [
      {
        name: "edit",
        icon: <FaPencil className="w-5 h-5" />,
        handler: (tag: ITag) => router.push(`/admin/tags/edit/${tag.id}`),
        ariaLabel: "ویرایش تگ",
      },
      {
        name: "delete",
        icon: <FaTrash className="w-5 h-5 text-red-500" />,
        type: "button",
        className: "hover:bg-red-100 dark:hover:bg-red-900/20",
        ariaLabel: "حذف هشتگ",
        ariaControls: "confirmDeleteTag",
        ariaHasPopup: "dialog",
        handler: (row: ITag) => {
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
        ariaControls="confirmDeleteTag"
        title="تایید حذف هشتگ"
        message="آیا از حذف این هشتگ اطمینان دارید؟"
        confirmHandler={handleDelete}
        deletedItemId={deletingItemId}
      />
      <div className="container mx-auto p-4 space-y-6">
        <TableHeader tableHeader={InitialViewTable.tableHeader} />

        <DynamicTable
          data={tags}
          columns={columns}
          actions={actions}
          loading={isLoading}
          error={error}
          emptyState={
            <div className="flex flex-col items-center gap-4 py-8">
              <span className="text-lg text-gray-500">هیچ هشتگی یافت نشد</span>
            </div>
          }
          ariaLabel="جدول مدیریت تگ ها"
          rowKey="id"
        />
      </div>
    </>
  );
};

export default TagsPage;
