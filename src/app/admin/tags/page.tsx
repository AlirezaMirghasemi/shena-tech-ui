"use client";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaPencil } from "react-icons/fa6";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { useTags } from "@/hooks/DB/useTags";
import type { ITag } from "@/interfaces/models/ITag";
import { InitialViewTable } from "@/configs/admin/tags/InitialViewTable";
import TableHeader from "@/components/admin/layout/tables/viewAll/TableHeader";
import DynamicTable from "@/components/admin/layout/tables/viewAll/DynamicTable";
import { IDynamicTableColumn } from "@/interfaces/initials/admin/ViewTable/IDynamicTable";

const TagsPage = () => {
  const router = useRouter();
  const {
    tags,
    isLoading,
    error,
    actions: {
      loadAllTags,
      //, deleteTag
    },
  } = useTags();

  useEffect(() => {
    loadAllTags();
  }, []);

  //   const handleDelete = useCallback(
  //     async (tagId: string) => {
  //       if (confirm("آیا از حذف این تگ اطمینان دارید؟")) {
  //         try {
  //          //await deleteTag(tagId);
  //           await loadAllTags();
  //         } catch (error) {
  //           console.error("خطا در حذف تگ:", error);
  //         }
  //       }
  //     },
  //     [
  //         //deleteTag,
  //          loadAllTags]
  //   );

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
      //   {
      //     name: "delete",
      //     icon: <FaTrash className="w-5 h-5 text-red-500" />,
      //     //handler: (tag: ITag) => handleDelete(tag.id as string),
      //     className: "hover:bg-red-100 dark:hover:bg-red-900/20",
      //     ariaLabel: "حذف تگ",
      //   },
    ],
    [
      router,
      //     , handleDelete
    ]
  );

  if (isLoading) return <LoadingSkeleton />;

  return (
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
  );
};

export default TagsPage;
