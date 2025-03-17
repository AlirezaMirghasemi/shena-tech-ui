import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function TableFooter({ dataCount }: { dataCount: number }) {
  return (
    <>
      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
        <div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            <span className="font-semibold text-gray-800 dark:text-neutral-200">
              {dataCount}
            </span>{" "}
            داده یافت شده
            {/* //TODO:به جای داده نام جدول قرار بگیرد */}
          </p>
        </div>
        {/* TODO:  پیجینیت کامل پیاده سازی شود */}
        <div>
          {/* Pagination */}
          <nav className="flex items-center gap-x-1" aria-label="Pagination">
            <button
              type="button"
              className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              aria-label="Previous"
            >
              <FaChevronRight/>
              <span className="sr-only">Previous</span>
            </button>
            <div className="flex items-center gap-x-1">
              <span className="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10">
                1
              </span>
              <span className="min-h-9.5 flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-neutral-500">
                of
              </span>
              <span className="min-h-9.5 flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-neutral-500">
                3
              </span>
            </div>
            <button
              type="button"
              className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              aria-label="Next"
            >
              <span className="sr-only">Next</span>
              <FaChevronLeft/>
            </button>
          </nav>
          {/* End Pagination */}
        </div>
      </div>
    </>
  );
}
