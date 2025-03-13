import {  FaNewspaper, FaVideo } from "react-icons/fa6";

export default function MobileHeader() {
  return (
    <>
      <div
        id="mobile-menu"
        className="hs-collapse hidden sm:hidden transition-all duration-300 overflow-hidden bg-white dark:bg-neutral-800 shadow-lg mx-4 rounded-xl"
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          <a
            href="#"
            className="block py-2 px-3 font-medium text-blue-500 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            شناتک
          </a>
          <a
            href="#"
            className="block py-2 px-3 font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            رویداد ها
          </a>
          <a
            href="#"
            className="block py-2 px-3 font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            پرسش و پاسخ
          </a>
          <a
            href="#"
            className="block py-2 px-3 font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            ارتباط با ما
          </a>
          <a
            href="#"
            className="block py-2 px-3 font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            تماس با ما
          </a>
          <div className="border-t border-gray-200 dark:border-neutral-700 my-2"></div>

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

    </>
  );
}
