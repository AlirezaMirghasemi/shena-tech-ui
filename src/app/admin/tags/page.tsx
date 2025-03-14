"use client";
import DescriptionLoading from "@/components/common/DescriptionLoading";
import ViewTable from "@/components/admin/layout/tables/viewAll/ViewTable";
import { InitialViewTable } from "@/configs/admin/tags/InitialViewTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTagsAsync } from "@/store/thunks/tagsThunk";
import { useEffect } from "react";

export default function TagsPage() {
  const { tags, loading, error } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTagsAsync());
  }, [dispatch]);
  if (loading) return <DescriptionLoading/>;
  if (error) return error;
  InitialViewTable.tableBody.data = tags;
  return (
    <>
      <ViewTable initialViewTable={InitialViewTable} />

      {/* Footer */}
      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
        <div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            <span className="font-semibold text-gray-800 dark:text-neutral-200">
              12
            </span>{" "}
            results
          </p>
        </div>

        <div>
          <div className="inline-flex gap-x-2">
            <button
              type="button"
              className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Prev
            </button>

            <button
              type="button"
              className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              Next
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* End Footer */}
    </>
  );
}
