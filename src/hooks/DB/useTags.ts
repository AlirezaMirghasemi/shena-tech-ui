import { ITag, TagFormValues } from "@/interfaces/models/ITag";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentPage } from "@/store/slices/tagSlice";
import {
  createTagAsync,
  deleteTagAsync,
  fetchTagByIdAsync,
  fetchTagsAsync,
  updateTagAsync,
} from "@/store/thunks/tagsThunk";
import { useCallback } from "react";

/**
 * هوک سفارشی جهت مدیریت عملیات مربوط به هشتگ‌ها از قبیل بارگذاری، ایجاد و سایر عملیات
 */
export const useTags = () => {
  const dispatch = useAppDispatch();

  // دریافت وضعیت و داده‌های هشتگ‌ها از استور ریداکس
  const {
    data: tags,
    status,
    error,
    currentPage,
    totalPages,
  } = useAppSelector((state) => state.tags);

  /**
   * تابع بارگذاری تمام هشتگ‌ها از API
   */
  const loadAllTags = useCallback(
    (page = 1) => {
      dispatch(setCurrentPage(page));
      dispatch(fetchTagsAsync({ page, size: 1 }));
    },
    [dispatch]
  );
  const getTagById = (id: string) => dispatch(fetchTagByIdAsync(id));
  const deleteTag = (id: string) => dispatch(deleteTagAsync(id));

  /**
   * تابع ایجاد هشتگ جدید با استفاده از داده‌های فرم
   * @param formData - داده‌های فرم جهت ایجاد هشتگ
   * @returns نتیجه موفقیت یا شکست عملیات
   */
  const createNewTag = async (formData: TagFormValues) => {
    const newTag: ITag = {
      ...formData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await dispatch(createTagAsync(newTag)).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ایجاد هشتگ:", error);
      return false;
    }
  };
  const updateTag = async (id: string, values: Partial<TagFormValues>) => {
    try {
      const updatedTag = {
        ...values,
        updatedAt: Date.now(),
      };
      await dispatch(updateTagAsync({ id, tag: updatedTag })).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ویرایش هشتگ:", error);
      return false;
    }
  };
  return {
    tags,
    isLoading: status === "loading",
    error,
    actions: {
      loadAllTags,
      createNewTag,
      getTagById,
      updateTag,
      deleteTag,
    },
    currentPage,
    totalPages,
  };
};
