import { IViewTableHeader } from '@/interfaces/initials/admin/ViewTable/IViewTable';
export default function TableHeaderInfo({headerInfo}:{headerInfo:IViewTableHeader}) {
  return (
    <>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
          {headerInfo.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-neutral-400">
        {headerInfo.description}
        </p>
    </>
  );
}
