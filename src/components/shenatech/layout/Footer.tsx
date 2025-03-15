"use client";

import {
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <footer className="mt-auto  w-full  py-10 px-4 sm:px-6 lg:px-8 mx-auto border-t  border-gray-300 dark:border-blue-800">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
          <div>
            <a
              className="flex-none text-2xl font-semibold text-black focus:outline-hidden dark:text-white"
              href="#"
              aria-label="Brand"
            >
              شناتک
            </a>
          </div>
          {/* End Col */}

          <ul className="text-center">
            <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-neutral-600">
              <a
                className="inline-flex gap-x-2 text-lg text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                href="#"
              >
                درباره ی ما
              </a>
            </li>
            <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-neutral-600">
              <a
                className="inline-flex gap-x-2 text-lg text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                href="#"
              >
                ارتباط با ما
              </a>
            </li>
          </ul>
          {/* End Col */}

          {/* Social Brands */}
          <div className="md:text-end space-x-2">
            <a
              className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              href="#"
            >
              <FaLinkedinIn className="shrink-0 size-5.5" />
            </a>
            <a
              className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              href="#"
            >
              <FaTelegram className="shrink-0 size-5.5" />
            </a>
            <a
              className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              href="#"
            >
              <FaInstagram className="shrink-0 size-5.5" />
            </a>
            <a
              className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              href="#"
            >
              <FaYoutube className="shrink-0 size-5.5" />
            </a>
          </div>
          {/* End Social Brands */}
        </div>
        {/* End Grid */}
      </footer>
    </>
  );
}
