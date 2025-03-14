import { IViewTableBody } from "@/interfaces/initials/admin/ViewTable/IViewTable";

export default function TableBody({
  tableBody,
}: {
  tableBody: IViewTableBody;
}) {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-gray-50 dark:bg-neutral-800">
          <tr>
            <th scope="col" className="ps-6 py-3 text-start">
              <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                <input
                  type="checkbox"
                  className="shrink-0 border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-at-with-checkboxes-main"
                />
                <span className="sr-only">Checkbox</span>
              </label>
            </th>
            {tableBody.viewTHeadTitles &&
              tableBody.viewTHeadTitles.map((tHead) => (
                <th key={1}
                  scope="col"
                  className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                >
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                      {tHead}
                    </span>
                  </div>
                </th>
              ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {tableBody.data &&
            tableBody.data.map((line) => (
              <tr key={line.id}>
                <td className="size-px whitespace-nowrap">
                  <div className="ps-6 py-3">
                    <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                      <input
                        type="checkbox"
                        className="shrink-0 border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-at-with-checkboxes-1"
                      />
                      <span className="sr-only">Checkbox</span>
                    </label>
                  </div>
                </td>
                {tableBody.colTitles.map((col) => (
                  <td className="size-px whitespace-nowrap" key={col}>
                  <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                    <div className="flex items-center gap-x-3">
                      <div className="grow">
                        <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{line[col]}</span>
                      </div>
                    </div>
                  </div>
                </td>
                ))}
                <td className="size-px whitespace-nowrap">
              <div className="px-6 py-1.5">
                <a
                  className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                  href="#"
                >
                  Edit
                </a>
              </div>
            </td>
              </tr>
            ))}

        </tbody>
      </table>
    </>
  );
}
