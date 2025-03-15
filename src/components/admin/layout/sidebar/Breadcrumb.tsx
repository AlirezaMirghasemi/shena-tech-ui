import { FaChevronLeft } from "react-icons/fa6";

export default function Breadcrumb() {
    return(
        <>
<ol className="ms-3 flex items-center whitespace-nowrap">
        <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
          پنل مدیریت
          <FaChevronLeft/>
        </li>
        <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400" aria-current="page">
          داشبورد
        </li>
      </ol>
        </>
    );
}
