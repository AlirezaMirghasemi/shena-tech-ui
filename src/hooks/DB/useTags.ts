import { ITag, TagFormValues } from "@/interfaces/models/ITag";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createTagAsync,
  fetchTagByIdAsync,
  fetchTagsAsync,
  updateTagAsync,
} from "@/store/thunks/tagsThunk";

/**
 * هوک سفارشی جهت مدیریت عملیات مربوط به هشتگ‌ها از قبیل بارگذاری، ایجاد و سایر عملیات
 */
export const useTags = () => {
  const dispatch = useAppDispatch();

  // دریافت وضعیت و داده‌های هشتگ‌ها از استور ریداکس
  const {
    data: tags = [],
    status,
    error,
  } = useAppSelector((state) => state.tags);

  /**
   * تابع بارگذاری تمام هشتگ‌ها از API
   */
  const loadAllTags = () => dispatch(fetchTagsAsync());
  const getTagById = (id: string) => dispatch(fetchTagByIdAsync(id));

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
      await dispatch(updateTagAsync({ id, tag: values })).unwrap();
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
    },
  };
};
