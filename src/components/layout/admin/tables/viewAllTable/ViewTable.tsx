import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { IViewTable } from '@/interfaces/initials/admin/ViewTable/IViewTable';

export default function ViewTable({initialViewTable}:{initialViewTable:IViewTable}) {
    return(
        <>
            <TableHeader tableHeader={initialViewTable.tableHeader}/>
            <TableBody tableBody={initialViewTable.tableBody} />
        </>
    );
}
