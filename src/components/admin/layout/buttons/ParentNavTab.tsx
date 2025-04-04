import { IParentButton } from "@/interfaces/initials/admin/ISidebarButton";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import ActiveButton from "../sidebar/ActiveButton";

export default function ParentNavTab({ buttons }: { buttons: IParentButton }) {
  return (
    <>
      <li className="hs-accordion" id={buttons.name}>
        {!buttons.children && (
          <button
            type="button"
            className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200"
            aria-expanded="true"
            aria-controls={buttons.groupName}
          >
            <ActiveButton href={buttons.href || "#"}>
              {buttons.icon}
              {buttons.title}
            </ActiveButton>
          </button>
        )}

        {buttons.children && (
          <>
            <button
              type="button"
              className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200"
              aria-expanded="true"
              aria-controls={buttons.groupName}
            >
              {buttons.icon}
              {buttons.title}
              <FaCaretUp className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" />

              <FaCaretDown className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" />
            </button>
            <div
              id={buttons.groupName}
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
              role="region"
              aria-labelledby={buttons.name}
            >
              <ul
                className="hs-accordion-group pt-1  space-y-1"
                data-hs-accordion-always-open
              >
                {buttons.children.map((child) => (
                    <ParentNavTab buttons={child} key={child.name}/>
                ))}
              </ul>
            </div>
          </>
        )}
      </li>
    </>
  );
}
