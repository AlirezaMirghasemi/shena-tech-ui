"use client";



import ViewTable from "@/components/admin/layout/tables/viewAll/ViewTable";
import ErrorSkeleton from "@/components/common/ErrorSkeleton";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
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
  if (loading) return <LoadingSkeleton/>;
  if (error) return <ErrorSkeleton message={error} /> ;
  InitialViewTable.tableBody.data = roles;
  return (
    <>
      <ViewTable initialViewTable={InitialViewTable}/>
    </>
  );
}
