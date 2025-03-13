import { FaBars, FaX } from "react-icons/fa6";

export default function UserHeaderButton() {
  return (
    <>
      <button
        type="button"
        className="sm:hidden hs-collapse-toggle inline-flex items-center p-2 border border-gray-200 rounded-md bg-white text-gray-800 hover:bg-gray-50 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-600"
        data-hs-collapse="#mobile-menu"
        aria-expanded="false"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
      >
        <FaBars className="w-6 h-6 hs-collapse-open:hidden" />
        <FaX className="w-6 h-6 hidden hs-collapse-open:block" />
      </button>
    </>
  );
}
