"use client";
import { FaBarsStaggered } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";
import AccountView from "./AccountView";
import ParentNavTab from "../buttons/ParentNavTab";
import { SidebarButtons } from "@/configs/admin/SidebarButtons";
import Image from "next/image";

export default function Sidebar() {
  return (
    <>
      <div className="-mt-px">
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center py-2">
            <button
              type="button"
              className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">منو</span>
              <FaBarsStaggered />
            </button>
            <Breadcrumb />
          </div>
        </div>
      </div>
      <div
        id="hs-application-sidebar"
        className="hs-overlay  [--auto-close:lg]
        hs-overlay-open:translate-x-0
        -translate-x-full transition-all duration-300 transform
        w-65 h-full
        hidden
        fixed inset-y-0 start-0 z-60
      bg-white border-e border-gray-200
        lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
      dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="  flex items-center  px-12">
            {/* Logo */}
            <a
              className="flex-none rounded-xl items-center text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
              href="#"
              aria-label="shenatech"
            >
              <Image src="/shenatech_logo.png" alt="alt" width={150} height={150}/>
            </a>
            {/* End Logo */}
            <div className="hidden lg:block ms-2"></div>
          </div>
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <nav
              className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="flex flex-col space-y-1">
                <ParentNavTab buttons={SidebarButtons} />
              </ul>
            </nav>
          </div>
          <AccountView />
        </div>
      </div>
    </>
  );
}
