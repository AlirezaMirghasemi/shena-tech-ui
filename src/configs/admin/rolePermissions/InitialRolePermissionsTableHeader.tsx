import { IViewTable } from "@/interfaces/initials/admin/ViewTable/IViewTable";
import Link from "next/link";

export const InitialRolesTableHeader: IViewTable = {
  tableHeader: {
      title: "مجوز های نقش",
      description: " مشاهده و تخصیص مجوز به نقش",
      buttons: [
          {
              title: "تخصیص مجوز جدید",
              name: "AddPermission",
              element: (
                  <Link
                      href="permissions/add"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 focus:outline-hidden focus:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none"
                  >
                      تخصیص مجوز
                  </Link>
              ),
          },
      ],
      singleName: "مجوز"
  }

};
