import { ReactNode, useState, useCallback, useMemo } from "react";
import ErrorSkeleton from "@/components/common/ErrorSkeleton";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import {
  IDynamicTableProps,
  TextAlignment,
} from "@/interfaces/initials/admin/ViewTable/IDynamicTable";

const DynamicTable = <T extends object>({
  data,
  columns,
  actions,
  //pagination,
  loading,
  error,
  onSort,
  emptyState,
  className = "",
  ariaLabel = "dynamic-table",
  rowKey = "id" as keyof T,
}: IDynamicTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = useCallback(
    (key: keyof T) => {
      if (!onSort) return;

      const direction =
        sortConfig?.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc";

      setSortConfig({ key, direction });
      onSort(key, direction);
    },
    [onSort, sortConfig]
  );

  const alignmentClass = useCallback(
    (align?: TextAlignment) => align || "text-center",
    []
  );

  const renderHeader = useMemo(
    () => (
      <thead className="bg-gray-50 dark:bg-neutral-800">
        <tr>
          {columns.map((column) => (
            <th
              key={column.accessor.toString()}
              className={`
              px-6 py-3 text-xs font-bold uppercase tracking-wider
              ${alignmentClass(column.align)}
              ${
                column.sortable
                  ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700"
                  : ""
              }
            `}
              onClick={() => column.sortable && handleSort(column.accessor)}
              style={{ width: column.width }}
              aria-sort={
                sortConfig?.key === column.accessor
                  ? sortConfig.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined
              }
              aria-label={column.ariaLabel || column.header}
            >
              <div className="items-center gap-2">
                <span>{column.header}</span>
                {column.sortable && (
                  <span className="text-gray-400">
                    {sortConfig?.key === column.accessor &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </span>
                )}
              </div>
            </th>
          ))}
          {actions && (
            <th
              className={`px-6 py-3 text-xs font-bold uppercase ${alignmentClass(
                columns[0]?.align
              )}`}
            >
              عملیات
            </th>
          )}
        </tr>
      </thead>
    ),
    [columns, sortConfig, handleSort, alignmentClass, actions]
  );

  const renderBody = useMemo(() => {
    if (loading) return <LoadingSkeleton />;
    if (error) return <ErrorSkeleton message={error} />;

    return (
      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + (actions ? 1 : 0)}
              className="px-6 py-24 text-center"
            >
              {emptyState || (
                <div className="text-gray-500 dark:text-neutral-400">
                  داده‌ای برای نمایش وجود ندارد
                </div>
              )}
            </td>
          </tr>
        ) : Array.isArray(data) ? (
          data.map((row) => (
            <tr
              key={String(row[rowKey])}
              className="hover:bg-gray-50 dark:hover:bg-neutral-700/30 transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={column.accessor.toString()}
                  className={`px-6 py-4 text-sm ${alignmentClass(
                    column.align
                  )}`}
                >
                  {column.cellRenderer
                    ? column.cellRenderer(row)
                    : (row[column.accessor] as ReactNode)}
                </td>
              ))}
              {actions && (
                <td
                  className={`px-6 py-4 space-x-2 ${alignmentClass(
                    columns[0]?.align
                  )}`}
                >
                  {actions.map((action) => {
                    const isDisabled =
                      typeof action.disabled === "function"
                        ? action.disabled(row)
                        : action.disabled;

                    return (
                      <button
                        key={action.name}
                        onClick={() => !isDisabled && action.handler(row)}
                        className={`p-2 rounded-md transition-colors ${
                          action.className ||
                          "text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-label={action.ariaLabel || action.name}
                        disabled={isDisabled}
                      >
                        {action.icon}
                      </button>
                    );
                  })}
                </td>
              )}
            </tr>
          ))
        ) : (
          []
        )}
      </tbody>
    );
  }, [
    data,
    loading,
    error,
    columns,
    actions,
    alignmentClass,
    emptyState,
    rowKey,
  ]);

  return (
    <div
      className={`bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 ${className}`}
      aria-label={ariaLabel}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          {renderHeader}
          {renderBody}
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
