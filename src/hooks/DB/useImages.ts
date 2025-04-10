import { IImage, ImageFormValues } from "@/interfaces/models/IImage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
//import { setCurrentPage } from "@/store/slices/imageSlice";
import {
  createImageAsync,
  deleteImageAsync,
  fetchImageByIdAsync,
  //fetchImagesAsync,
  updateImageAsync,
} from "@/store/thunks/imagesThunk";
// import { useCallback } from "react";

/**
 * هوک سفارشی جهت مدیریت عملیات مربوط به عکس‌ها از قبیل بارگذاری، ایجاد و سایر عملیات
 */
export const useImages = () => {
  const dispatch = useAppDispatch();

  // دریافت وضعیت و داده‌های عکس‌ها از استور ریداکس
  const {
    data: images,
    status,
    error,
    currentPage,
    totalPages,
  } = useAppSelector((state) => state.images);

  /**
   * تابع بارگذاری تمام عکس‌ها از API
   */
  //   const loadAllImages = useCallback(
  //     (page = 1) => {
  //       dispatch(setCurrentPage(page));
  //       dispatch(fetchImagesAsync({ page, size: 1 }));
  //     },
  //     [dispatch]
  //   );
  const getImageById = (id: string) => dispatch(fetchImageByIdAsync(id));
  const deleteImage = (id: string) => dispatch(deleteImageAsync(id));

  /**
   * تابع ایجاد عکس جدید با استفاده از داده‌های فرم
   * @param formData - داده‌های فرم جهت ایجاد عکس
   * @returns نتیجه موفقیت یا شکست عملیات
   */
  const createNewImage = async (formData: ImageFormValues) => {
    const newImage: IImage = {
      ...formData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await dispatch(createImageAsync(newImage)).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ایجاد عکس:", error);
      return false;
    }
  };
  const updateImage = async (id: string, values: Partial<ImageFormValues>) => {
    try {
      const updatedImage = {
        ...values,
        updatedAt: Date.now(),
      };
      await dispatch(updateImageAsync({ id, image: updatedImage })).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ویرایش عکس:", error);
      return false;
    }
  };
  return {
    images,
    isLoading: status === "loading",
    error,
    actions: {
      //loadAllImages,
      createNewImage,
      getImageById,
      updateImage,
      deleteImage,
    },
    currentPage,
    totalPages,
  };
};
