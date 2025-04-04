"use client";
import ThemeToggle from "@/components/common/ThemeToggle";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm py-2.5 lg:ps-65 dark:bg-neutral-800 dark:border-neutral-700">
        <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
          <div className="me-5 lg:me-0 lg:hidden">
            {/* Logo */}
            <a
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
              href="#"
              aria-label="Preline"
            >
              <Image
                src="/shenatech_logo.png"
                alt="alt"
                width={150}
                height={150}
              />
            </a>
            {/* End Logo */}
            <div className="lg:hidden ms-1"></div>
          </div>
          <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
            <div className="hidden md:block">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                  <FaSearch className="shrink-0 size-4 text-gray-400 dark:text-white/60" />
                </div>
                <input
                  type="text"
                  className="py-2 ps-10 pe-16 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
                  placeholder="جست و جو"
                />
                <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
                  <button
                    type="button"
                    className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                    aria-label="Close"
                  >
                    <span className="sr-only">Close</span>
                    <FaSearch className="shrink-0 size-4 text-gray-400 dark:text-white/60" />
                  </button>
                </div>
              </div>
              {/* End Search Input */}
            </div>

            <div className="flex flex-row items-center justify-end gap-1">
              <button
                type="button"
                className="md:hidden size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                <FaSearch className="shrink-0 size-4" />
                <span className="sr-only">جست و جو</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
