import { ITag } from "@/interfaces/models/ITag";
import { createTag, fetchTags } from "@/services/tagServices/TagServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * توکن آسنکرون جهت دریافت لیست تگ‌ها از API
 */
export const fetchTagsAsync = createAsyncThunk("tags/fetchTags", async () => {
  const response: ITag[] = await fetchTags();
  return response ? response : [];
});

/**
 * توکن آسنکرون جهت ایجاد تگ جدید با ارسال داده‌های تگ به API
 */
export const createTagAsync = createAsyncThunk(
  "tags/newTag",
  async (tag: Omit<ITag, "id">, { rejectWithValue }) => {
    try {
      const response = await createTag(tag);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ایجاد تگ");
    }
  }
);
