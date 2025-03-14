import TableHeaderInfo from "./TableHeaderInfo";
import TableHeaderButton from "./TableHeaderButton";
import { IViewTableHeader } from "@/interfaces/initials/admin/ViewTable/IViewTable";
export default function TableHeader({tableHeader}:{tableHeader:IViewTableHeader}) {
  return (
    <>
      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
        <div>
          <TableHeaderInfo headerInfo={tableHeader}/>
        </div>
        <div>

        {
                tableHeader.buttons && (
                    <TableHeaderButton>
                             { tableHeader.buttons.map((button)=>(button.element))}
                    </TableHeaderButton>
                )
            }
        </div>
      </div>
    </>
  );
}
