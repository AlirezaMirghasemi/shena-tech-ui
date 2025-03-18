"use client";
import ViewTable from "@/components/admin/layout/tables/viewAll/ViewTable";
import { InitialViewTable } from "@/configs/admin/tags/InitialViewTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTagsAsync } from "@/store/thunks/tagsThunk";
import { useEffect } from "react";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ErrorSkeleton from "@/components/common/ErrorSkeleton";

export default function TagsPage() {
  const { tags, loading, error } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTagsAsync());
  }, [dispatch]);
  if (loading) return <LoadingSkeleton/>;
    if (error) return <ErrorSkeleton message={error}/>;
  InitialViewTable.tableBody.data = tags;
  return (
    <>
      <ViewTable initialViewTable={InitialViewTable} />
    </>
  );
}
