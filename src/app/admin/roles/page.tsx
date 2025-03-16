"use client";

import ViewTable from "@/components/admin/layout/tables/viewAll/ViewTable";
import DescriptionLoading from "@/components/common/DescriptionLoading";
import { InitialViewTable } from "@/configs/admin/roles/InitialViewTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRolesAsync } from "@/store/thunks/rolesThunk";
import { useEffect } from "react";


export default function RolesPage() {
  const { roles, loading, error } = useAppSelector((state) => state.roles);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, [dispatch]);
  if (loading) return <DescriptionLoading/>;
  if (error) return error;
  InitialViewTable.tableBody.data = roles;
  return (
    <>
      <ViewTable initialViewTable={InitialViewTable} />
    </>
  );
}
