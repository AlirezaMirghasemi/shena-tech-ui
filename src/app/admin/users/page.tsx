"use client";
import DescriptionLoading from "@/components/common/DescriptionLoading";
import ViewTable from "@/components/admin/layout/tables/viewAll/ViewTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchUsersAsync } from "@/store/thunks/usersThunk";
import { InitialViewTable } from "@/configs/admin/users/InitialViewTable";

export default function UsersPage() {
  const { users, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  if (loading) return <DescriptionLoading />;
  if (error) return error;
  InitialViewTable.tableBody.data = users;
  return (
    <>
      <ViewTable initialViewTable={InitialViewTable} />
    </>
  );
}
