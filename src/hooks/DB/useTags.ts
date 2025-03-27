import { ITag, TagFormValues } from "@/interfaces/models/ITag";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createTagAsync, fetchTagsAsync } from "@/store/thunks/tagsThunk";

/**
 * هوک سفارشی جهت مدیریت عملیات مربوط به تگ‌ها از قبیل بارگذاری، ایجاد و سایر عملیات
 */
export const useTags = () => {
  const dispatch = useAppDispatch();

  // دریافت وضعیت و داده‌های تگ‌ها از استور ریداکس
  const {
    data: tags = [],
    status,
    error,
  } = useAppSelector((state) => state.tags);

  /**
   * تابع بارگذاری تمام تگ‌ها از API
   */
  const loadAllTags = () => dispatch(fetchTagsAsync());

  /**
   * تابع ایجاد تگ جدید با استفاده از داده‌های فرم
   * @param formData - داده‌های فرم جهت ایجاد تگ
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
      console.error("خطا در ایجاد تگ:", error);
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
    },
  };
};
