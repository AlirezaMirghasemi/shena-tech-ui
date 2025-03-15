import {  FaHandPeace, FaPenToSquare } from "react-icons/fa6";
import MobileHeaderButton from "./UserHeaderButton";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function UserActionHeader() {
    return(
<>
<nav className="max-w-[85rem] w-full mx-auto mb-0 px-8 flex items-center justify-between my-10 inset-shadow-sm py-10 rounded-2xl bg-white dark:bg-blue-800">
          {/* سمت چپ: برند */}
          <div className="flex items-center">

            <a className="text-xl font-semibold dark:text-white" href="#">
              شناتک
            </a>

          </div>
          {/* مرکز: لینک‌های ناوبری دسکتاپ */}
          {/* سمت راست: منوها */}
          <div className="flex items-center gap-x-2">
            {/* منوی دراپ‌دان دسکتاپ */}
            <div className="hidden sm:inline-block hs-dropdown relative">
            <div className="hs-dropdown-toggle shrink-0 group block">
  <div className=" flex items-center">
    <img className="inline-block shrink-0 size-15.5 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Avatar"/>
    <div className="ms-3">
      <h3 className="font-semibold text-gray-800 dark:text-white">Mark Wanner</h3>
      <p className="text-sm font-medium text-gray-400 dark:text-neutral-500">mark@gmail.com</p>
    </div>
  </div>
</div>

              <div className="hs-dropdown-menu transition-[opacity,margin] duration-300 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700">
                <div className="space-y-1.5">
                  <a
                    href="#"
                    className="block py-2 px-3 font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FaPenToSquare />
ثبت نام
                    </span>
                  </a>
                  <a
                    href="#"
                    className="block py-2 px-3 font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FaHandPeace />
                      ورود
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <MobileHeaderButton/>
            <ThemeToggle/>

          </div>
        </nav>
</>
    );
}
