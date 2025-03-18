import { IViewTable } from "@/interfaces/initials/admin/ViewTable/IViewTable";
import Link from "next/link";

export const InitialViewTable: IViewTable = {
  tableHeader: {
    title: "کاربران",
    description: " مشاهده، اعمال تغییرات و امکان حذف کاربران",
    singleName:"کاربر",
    buttons: [
      {
        title: "کاربر جدید",
        name: "NewUser",
        element: (
          <Link
            href="users/new"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 focus:outline-hidden focus:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            کاربر جدید
          </Link>
        ),
      },
    ],
  },
  tableBody: {
    colTitles: ["username", "email","fullName","mobile"],
    data: [],
    buttons: [
        {
            title: "ویرایش",
            name: "edit",
            element: (id: string) => (
              <Link
                href={`/admin/users/edit/${id}`}
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
                href={`/admin/users/delete/${id}`}
                className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
              >
                حذف
              </Link>
            )
          }

    ],
    viewTHeadTitles: ["نام کاربری", "ایمیل", "نام کامل","شماره همراه","عملیات"],
  },
};
