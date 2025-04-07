import { ISlug, SlugFormValues } from "@/interfaces/models/ISlug";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentPage } from "@/store/slices/slugSlice";
import {
  createSlugAsync,
  deleteSlugAsync,
  fetchSlugByIdAsync,
  fetchSlugsAsync,
  updateSlugAsync,
} from "@/store/thunks/slugsThunk";
import { useCallback } from "react";

/**
 * هوک سفارشی جهت مدیریت عملیات مربوط به اسلاگ‌ها از قبیل بارگذاری، ایجاد و سایر عملیات
 */
export const useSlugs = () => {
  const dispatch = useAppDispatch();

  // دریافت وضعیت و داده‌های اسلاگ‌ها از استور ریداکس
  const {
    data: slugs,
    status,
    error,
    currentPage,
    totalPages,
  } = useAppSelector((state) => state.slugs);

  /**
   * تابع بارگذاری تمام اسلاگ‌ها از API
   */
  const loadAllSlugs = useCallback(
    (page = 1) => {
      dispatch(setCurrentPage(page));
      dispatch(fetchSlugsAsync({ page, size: 1 }));
    },
    [dispatch]
  );
  const getSlugById = (id: string) => dispatch(fetchSlugByIdAsync(id));
  const deleteSlug = (id: string) => dispatch(deleteSlugAsync(id));

  /**
   * تابع ایجاد اسلاگ جدید با استفاده از داده‌های فرم
   * @param formData - داده‌های فرم جهت ایجاد اسلاگ
   * @returns نتیجه موفقیت یا شکست عملیات
   */
  const createNewSlug = async (formData: SlugFormValues) => {
    const newSlug: ISlug = {
      ...formData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await dispatch(createSlugAsync(newSlug)).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ایجاد اسلاگ:", error);
      return false;
    }
  };
  const updateSlug = async (id: string, values: Partial<SlugFormValues>) => {
    try {
      await dispatch(updateSlugAsync({ id, slug: values })).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ویرایش اسلاگ:", error);
      return false;
    }
  };
  return {
    slugs,
    isLoading: status === "loading",
    error,
    actions: {
      loadAllSlugs,
      createNewSlug,
      getSlugById,
      updateSlug,
      deleteSlug,
    },
    currentPage,
    totalPages,
  };
};
