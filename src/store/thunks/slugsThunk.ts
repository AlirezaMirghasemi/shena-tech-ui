import { ISlug } from "@/interfaces/models/ISlug";
import { createSlug, fetchSlugs } from "@/services/slugServices/SlugServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * توکن آسنکرون جهت دریافت لیست اسلاگ‌ها از API
 */
export const fetchSlugsAsync = createAsyncThunk(
  "slugs/fetchSlugs",
  async () => {
    const response: ISlug[] = await fetchSlugs();
    return response ? response : [];
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
