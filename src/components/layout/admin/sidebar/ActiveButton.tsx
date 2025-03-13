import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

function ActiveButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      href={href}
      className={`
              flex items-center focus:outline-hidden gap-x-3.5 py-2 px-2.5
               text-gray-800 rounded-lg hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700
              ${
                isActive
                  ? "bg-gray-100 text-l    dark:bg-neutral-700   dark:text-white"
                  : "w-full text-sm     dark:bg-neutral-800   dark:text-neutral-200"
              }`}
    >
      {children}
    </Link>
  );
}

export default ActiveButton;
