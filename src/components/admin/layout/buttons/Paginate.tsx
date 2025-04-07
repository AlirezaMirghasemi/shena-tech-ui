// components/Paginate.tsx
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Paginate = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginateProps) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className={`flex justify-center items-center p-4 ${className}`}>
      <nav className="flex items-center gap-4" aria-label="ناوبری صفحه‌بندی">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={`p-2 rounded-md transition-colors ${
            isFirstPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 dark:hover:bg-neutral-700"
          }`}
          aria-label="صفحه قبلی"
        >
          <FaAngleRight className="w-5 h-5" />
        </button>

        <span className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 rounded-md">
            {currentPage}
          </span>
          <span className="text-gray-500 dark:text-neutral-400">از</span>
          <span className="text-gray-500 dark:text-neutral-400">
            {totalPages}
          </span>
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={`p-2 rounded-md transition-colors ${
            isLastPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 dark:hover:bg-neutral-700"
          }`}
          aria-label="صفحه بعدی"
        >
          <FaAngleLeft className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
};

export default Paginate;
