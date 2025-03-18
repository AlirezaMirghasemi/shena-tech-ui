import { IViewTable } from "@/interfaces/initials/admin/ViewTable/IViewTable";
import Link from "next/link";

export const InitialViewTable: IViewTable = {
  tableHeader: {
    title: "اسلاگ ها",
    description: " مشاهده، اعمال تغییرات و امکان حذف اسلاگ ها",
    buttons: [
      {
        title: "اسلاگ جدید",
        name: "NewSlug",
        element: (
          <Link
            href="slugs/new"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 focus:outline-hidden focus:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            اسلاگ جدید
          </Link>
        ),
      },
    ],
    singleName:"اسلاگ"
  },
  tableBody: {
    colTitles: ["titlePersian", "titleEnglish"],
    data: [],
    buttons: [
        {
            title: "ویرایش",
            name: "edit",
            element: (id: string) => (
              <Link
                href={`/admin/slugs/edit/${id}`}
                className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
              >
                ویرایش
              </Link>
            )
          },
          {
            title: "حذف",
            name: "delete",
            element: (id: string) => (
              <Link
                href={`/admin/slugs/delete/${id}`}
                className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
              >
                حذف
              </Link>
            )
          }

    ],
    viewTHeadTitles: ["عنوان فارسی", "عنوان انگلیسی", "عملیات"],
  },
};
