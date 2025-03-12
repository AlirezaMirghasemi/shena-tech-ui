import {usePathname} from "next/navigation";
import Link from "next/link";

import { ReactNode } from "react";

function ActiveLink({href, children, pos}: { href: string, children: ReactNode, pos: string }) {
    const pathName = usePathname();
    const isActive = pathName === href;
    let fontSize = 'font-medium';
    pos === "header" ? fontSize = "font-medium" : fontSize = "inline-flex gap-x-2 text-sm"
    return (
        <Link href={href}
              className={`${fontSize} focus:outline-hidden ${isActive ? "text-blue-500 hover:text-gray-600" : "text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400"}`}>
            {children}
        </Link>
    );
}

export default ActiveLink;
