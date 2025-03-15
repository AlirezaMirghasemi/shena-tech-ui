import { FaCaretDown, FaNewspaper, FaVideo } from "react-icons/fa6";

export default function BlogLinkHeader() {
  return (
    <>
      <nav className="hidden sm:flex w-full mt-0 px-8 justify-center items-center my-10 shadow-md py-2 rounded-xl bg-blue-200 dark:bg-blue-900">
        <div className="flex items-center gap-x-5">
          <a
            className="font-medium text-blue-600 focus:outline-none dark:text-blue-400 dark:hover:text-blue-500"
            href="#"
            aria-current="page"
          >
            شناتک
          </a>

          <a
            className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500"
            href="#"
          >
            رویداد ها
          </a>

          {/* Dropdown آموزش */}
          <div className="hs-dropdown relative">
            <button
              type="button"
              className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 font-medium text-gray-600 hover:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500"
            >
              آموزش
              <FaCaretDown className="hs-dropdown-open:rotate-180 w-4 h-4" />
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] duration-300 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700">
              <div className="space-y-1.5">
                <a
                  href="#"
                  className="block py-2 px-3 font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FaNewspaper />
                    مقالات
                  </span>
                </a>
                <a
                  href="#"
                  className="block py-2 px-3 font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FaVideo />
                    ویدیو ها
                  </span>
                </a>
              </div>
            </div>
          </div>

          <a
            className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500"
            href="#"
          >
            پرسش و پاسخ
          </a>

          <a
            className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500"
            href="#"
          >
            ارتباط با ما
          </a>

          <a
            className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500"
            href="#"
          >
            تماس با ما
          </a>
        </div>
      </nav>
    </>
  );
}
