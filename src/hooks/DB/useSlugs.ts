import { ISlug, SlugFormValues } from "@/interfaces/models/ISlug";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createSlugAsync, fetchSlugsAsync } from "@/store/thunks/slugsThunk";


/**
 * هوک سفارشی جهت مدیریت عملیات مربوط به اسلاگ‌ها از قبیل بارگذاری، ایجاد و سایر عملیات
 */
export const useSlugs = () => {
  const dispatch = useAppDispatch();

  // دریافت وضعیت و داده‌های اسلاگ‌ها از استور ریداکس
  const {
    data: slugs = [],
    status,
    error,
  } = useAppSelector((state) => state.slugs);

  /**
   * تابع بارگذاری تمام اسلاگ‌ها از API
   */
  const loadAllSlugs = () => dispatch(fetchSlugsAsync());

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

  return {
    slugs,
    isLoading: status === "loading",
    error,
    actions: {
      loadAllSlugs,
      createNewSlug,
    },
  };
};
