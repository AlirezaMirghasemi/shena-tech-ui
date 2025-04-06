import { ISlug } from "@/interfaces/models/ISlug";
import {
  createSlug,
  deleteSlug,
  fetchSlugById,
  fetchSlugs,
  updateSlug
} from "@/services/slugServices/SlugServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * توکن آسنکرون جهت دریافت لیست اسلاگ‌ها از API
 */
export const fetchSlugsAsync = createAsyncThunk(
  "slugs/fetchSlugs",
  async () => {
    try {
        const response: ISlug[] = await fetchSlugs();
    return response ? response : [];
    } catch (error) {
        if (error instanceof Error) {
            return (error.message);
          }
          return ("خطای ناشناخته در پیمایش اسلاگ");
    }
  }
);

//fetch slug by id
export const fetchSlugByIdAsync = createAsyncThunk(
  "slugs/fetchSlugById",
  async (id: string,{rejectWithValue}) => {
    try {
        const response: ISlug = await fetchSlugById({ id });
    return response ? response : null;
    } catch (error ) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
          }
          return rejectWithValue("خطای ناشناخته در پیمایش تکی اسلاگ");
    }
  }
);

/**
 * توکن آسنکرون جهت ایجاد اسلاگ جدید با ارسال داده‌های اسلاگ به API
 */
export const createSlugAsync = createAsyncThunk(
  "slugs/newSlug",
  async (slug: Omit<ISlug, "id">, { rejectWithValue }) => {
    try {
      const response = await createSlug(slug);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ایجاد اسلاگ");
    }
  }
);

//edit slug
export const updateSlugAsync = createAsyncThunk(
    "slugs/updateSlug",
    async ({id, slug}: {id: string; slug: Partial<ISlug>}, {rejectWithValue}) => {
      try {
        const response = await updateSlug({id, data: slug});
        return response;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue("خطای ناشناخته در ویرایش اسلاگ");
      }
    }
  );
//delete slug
export const deleteSlugAsync = createAsyncThunk(
  "slugs/deleteSlug",
  async (id: string) => {
    try {
      const response = await deleteSlug({ id });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "خطای ناشناخته در حذف نقش";
    }
  }
);
