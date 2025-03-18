"use client";
import ViewTable from "@/components/admin/layout/tables/viewAll/ViewTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchSlugsAsync } from "@/store/thunks/slugsThunk";
import { InitialViewTable } from "@/configs/admin/slugs/InitialViewTable";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ErrorSkeleton from "@/components/common/ErrorSkeleton";

export default function SlugsPage() {
  const { slugs, loading, error } = useAppSelector((state) => state.slugs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSlugsAsync());
  }, [dispatch]);
  if (loading) return <LoadingSkeleton/>;
    if (error) return <ErrorSkeleton message={error}/>;
  InitialViewTable.tableBody.data = slugs;
  return (
    <>
      <ViewTable initialViewTable={InitialViewTable} />
    </>
  );
}
