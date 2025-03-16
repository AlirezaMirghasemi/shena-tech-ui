"use client";
import DescriptionLoading from "@/components/common/DescriptionLoading";
import ViewTable from "@/components/admin/layout/tables/viewAll/ViewTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchSlugsAsync } from "@/store/thunks/slugsThunk";
import { InitialViewTable } from "@/configs/admin/slugs/InitialViewTable";

export default function SlugsPage() {
  const { slugs, loading, error } = useAppSelector((state) => state.slugs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSlugsAsync());
  }, [dispatch]);
  if (loading) return <DescriptionLoading/>;
  if (error) return error;
  InitialViewTable.tableBody.data = slugs;
  return (
    <>
      <ViewTable initialViewTable={InitialViewTable} />
    </>
  );
}
