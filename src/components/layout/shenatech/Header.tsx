"use client";
import ThemeToggle from "@/components/common/ThemeToggle";
import {
  FaBars,
  FaCaretDown,
  FaNewspaper,
  FaVideo,
  FaX,
} from "react-icons/fa6";
export default function Header() {
  return (
    <>
      <header>
        <nav className="max-w-[85rem] w-full mx-auto px-8 flex items-center justify-between my-10 shadow-xl py-2 rounded-full bg-white dark:bg-neutral-800">
          {/* سمت چپ: برند */}
          <div className="flex items-center">
            <a className="text-xl font-semibold dark:text-white" href="#">
              شناتک
            </a>
          </div>

          {/* مرکز: لینک‌های ناوبری دسکتاپ */}
          <div className="hidden sm:flex items-center gap-x-5">
            <a
              className="font-medium text-blue-500 focus:outline-none"
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
              تماس با ما{" "}
            </a>
          </div>

          {/* سمت راست: منوها */}
          <div className="flex items-center gap-x-2">
            {/* منوی دراپ‌دان دسکتاپ */}
            <div className="hidden sm:inline-block hs-dropdown relative">
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

            {/* دکمه منوی موبایل */}
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
            <ThemeToggle />
          </div>
        </nav>

        {/* منوی موبایل */}
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
      </header>
    </>
  );
}
