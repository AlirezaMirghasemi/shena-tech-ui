"use client";

import InitialRolesViewTable from "@/configs/admin/roles/InitialRolesViewTable";
import { usePermissions } from "@/hooks/DB/usePermissions";
import { IPermission } from "@/interfaces/models/IPermission";
import { useState } from "react";
import InitialRolePermissionsTable from '../../../configs/admin/rolePermissions/InitialRolePermissionsTable';

const RolesPage = () => {
  const [rolePermissions, setRolePermissions] = useState<IPermission[]>([]);
  const { actions } = usePermissions();

  const fetchRolePermissions = async ({
    roleId,
  }: {
    roleId: string;
  }): Promise<IPermission[]> => {
    const permissions = await actions.getRolePermissions(roleId);
    return permissions || [];
  };
  return (
    <>
      <InitialRolesViewTable
        fetchRolePermissions={fetchRolePermissions}
        setRolePermissions={setRolePermissions}
      />
      <nav
        className="relative z-0 flex border border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700"
        aria-label="Tabs"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button
          type="button"
          className="hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 border-gray-200 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 active"
          id="bar-with-underline-item-1"
          aria-selected="true"
          data-hs-tab="#bar-with-underline-1"
          aria-controls="bar-with-underline-1"
          role="tab"
        >
          مجوز ها
        </button>
        <button
          type="button"
          className="hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 border-gray-200 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400"
          id="bar-with-underline-item-2"
          aria-selected="false"
          data-hs-tab="#bar-with-underline-2"
          aria-controls="bar-with-underline-2"
          role="tab"
        >
          کاربران
        </button>
      </nav>

      <div className="mt-3">
        <div
          id="bar-with-underline-1"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-1"
        >
          <InitialRolePermissionsTable permissions={rolePermissions}/>
        </div>
        <div
          id="bar-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-2"
        >
          <h3 className="">جدول کاربران</h3>
        </div>
      </div>
    </>
  );
};

export default RolesPage;
