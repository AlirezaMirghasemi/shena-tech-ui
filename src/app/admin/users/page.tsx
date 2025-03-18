"use client";
import ViewTable from "@/components/admin/layout/tables/viewAll/ViewTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchUsersAsync } from "@/store/thunks/usersThunk";
import { InitialViewTable } from "@/configs/admin/users/InitialViewTable";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ErrorSkeleton from "@/components/common/ErrorSkeleton";
//ToDo: اوردن عکس کاربر در جدول
export default function UsersPage() {
  const { users, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  if (loading) return <LoadingSkeleton/>;
  if (error) return <ErrorSkeleton message={error}/>;
  InitialViewTable.tableBody.data = users;
  return (
    <>
      <ViewTable initialViewTable={InitialViewTable} />
    </>
  );
}
