import { IImage } from "@/interfaces/models/IImage";
import {
  createImage,
  deleteImage,
  fetchImageById,
  //fetchImages,
  updateImage,
} from "@/services/imageServices/ImageServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * توکن آسنکرون جهت دریافت لیست عکس‌ها از API
 */
// export const fetchImagesAsync = createAsyncThunk(
//     "images/fetchImages",
//     async ({ page, size }: { page: number; size: number }) => {
//       try {
//         const response = await fetchImages(page, size);
//         return response;
//       } catch (error) {
//         if (error instanceof Error) {
//           throw new Error(error.message);
//         }
//         throw new Error("Unknown error fetching images");
//       }
//     }
//   );

//fetch image by id
export const fetchImageByIdAsync = createAsyncThunk(
  "images/fetchImageById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: IImage = await fetchImageById({ id });
      return response ? response : null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در پیمایش تکی عکس");
    }
  }
);

/**
 * توکن آسنکرون جهت ایجاد عکس جدید با ارسال داده‌های عکس به API
 */
export const createImageAsync = createAsyncThunk(
  "images/newImage",

  async (
    { image, imageFile }: { image: Omit<IImage, "id">; imageFile: File },
    { rejectWithValue }: { rejectWithValue: (value: string) => void }
  ) => {
    try {
      const response = await createImage(image, imageFile);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ایجاد عکس");
    }
  }
);

//edit image
export const updateImageAsync = createAsyncThunk(
  "images/updateImage",
  async (
    { id, image }: { id: string; image: Partial<IImage> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateImage({ id, data: image });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ویرایش عکس");
    }
  }
);
//delete image
export const deleteImageAsync = createAsyncThunk(
  "images/deleteImage",
  async ({ id, imageDirectory }: { id: string; imageDirectory: string }) => {
    try {
      const response = await deleteImage({ id, imageDirectory });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "خطای ناشناخته در حذف عکس";
    }
  }
);
