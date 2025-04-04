import { FaAnglesUp } from "react-icons/fa6";

export default function AccountView() {
  return (
    <>
      <footer className="mt-auto p-2 border-t border-gray-200 dark:border-neutral-700">
        <div className="hs-dropdown [--strategy:absolute] [--auto-close:inside] relative w-full inline-flex">
          <button
            id="hs-sidebar-footer-example-with-dropdown"
            type="button"
            className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            <img
              className="shrink-0 size-5 rounded-full"
              src="https://images.unsplash.com/photo-1734122415415-88cb1d7d5dc0?q=80&w=320&h=320&auto=format&fit=facearea&facepad=3&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Avatar"
            />
            Mia Hudson
            <FaAnglesUp
              className="shrink-0 size-3.5 ms-auto"
              width="24"
              height="24"
            />
          </button>

          <div
            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="hs-sidebar-footer-example-with-dropdown"
          >
            <div className="p-1">
              <a
                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#"
              >
                My account
              </a>
              <a
                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#"
              >
                Settings
              </a>
              <a
                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#"
              >
                Billing
              </a>
              <a
                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
