"use client";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaPencil } from "react-icons/fa6";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { useSlugs } from "@/hooks/DB/useSlugs";
import type { ISlug } from "@/interfaces/models/ISlug";
import { InitialViewTable } from "@/configs/admin/slugs/InitialViewTable";
import TableHeader from "@/components/admin/layout/tables/viewAll/TableHeader";
import DynamicTable from "@/components/admin/layout/tables/viewAll/DynamicTable";
import { IDynamicTableColumn } from "@/interfaces/initials/admin/ViewTable/IDynamicTable";

const SlugsPage = () => {
  const router = useRouter();
  const {
    slugs,
    isLoading,
    error,
    actions: {
      loadAllSlugs,
      //, deleteSlug
    },
  } = useSlugs();

  useEffect(() => {
    loadAllSlugs();
  }, []);

  //   const handleDelete = useCallback(
  //     async (slugId: string) => {
  //       if (confirm("آیا از حذف این اسلاگ اطمینان دارید؟")) {
  //         try {
  //          //await deleteSlug(slugId);
  //           await loadAllSlugs();
  //         } catch (error) {
  //           console.error("خطا در حذف اسلاگ:", error);
  //         }
  //       }
  //     },
  //     [
  //         //deleteSlug,
  //          loadAllSlugs]
  //   );

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
      //   {
      //     name: "delete",
      //     icon: <FaTrash className="w-5 h-5 text-red-500" />,
      //     //handler: (slug: ISlug) => handleDelete(slug.id as string),
      //     className: "hover:bg-red-100 dark:hover:bg-red-900/20",
      //     ariaLabel: "حذف اسلاگ",
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
        ariaLabel="جدول مدیریت اسلاگ ها"
        rowKey="id"
      />
    </div>
  );
};

export default SlugsPage;
