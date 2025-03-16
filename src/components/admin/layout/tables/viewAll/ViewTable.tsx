import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { IViewTable } from "@/interfaces/initials/admin/ViewTable/IViewTable";
import TableFooter from './TableFooter';

export default function ViewTable({
  initialViewTable,
}: {
  initialViewTable: IViewTable;
}) {
  if (initialViewTable.tableBody.data.length == 0)
    return (
      <>
        <TableHeader tableHeader={initialViewTable.tableHeader} />
        <div
          className="mt-2 bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
          role="alert"
          tabIndex={-1}
          aria-labelledby="hs-soft-color-warning-label"
        >
          <span id="hs-soft-color-warning-label" className="font-bold">
            {initialViewTable.tableHeader.singleName+" "}
          </span>
         تعریف نشده است
        </div>
      </>
    );
  return (
    <>
      <TableHeader tableHeader={initialViewTable.tableHeader} />
      <TableBody tableBody={initialViewTable.tableBody} />
      <TableFooter dataCount={initialViewTable.tableBody.data.length}/>
    </>
  );
}
