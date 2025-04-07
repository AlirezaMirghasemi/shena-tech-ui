import { ITag } from "@/interfaces/models/ITag";
import {
  createTag,
  deleteTag,
  fetchTagById,
  fetchTags,
  updateTag,
} from "@/services/tagServices/TagServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * توکن آسنکرون جهت دریافت لیست هشتگ‌ها از API
 */
export const fetchTagsAsync = createAsyncThunk(
    "tags/fetchTags",
    async ({ page, size }: { page: number; size: number }) => {
      try {
        const response = await fetchTags(page, size);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Unknown error fetching tags");
      }
    }
  );

//fetch tag by id
export const fetchTagByIdAsync = createAsyncThunk(
  "tags/fetchTagById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: ITag = await fetchTagById({ id });
      return response ? response : null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در پیمایش تکی هشتگ");
    }
  }
);

/**
 * توکن آسنکرون جهت ایجاد هشتگ جدید با ارسال داده‌های هشتگ به API
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
      return rejectWithValue("خطای ناشناخته در ایجاد هشتگ");
    }
  }
);

//edit tag
export const updateTagAsync = createAsyncThunk(
  "tags/updateTag",
  async (
    { id, tag }: { id: string; tag: Partial<ITag> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateTag({ id, data: tag });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ویرایش هشتگ");
    }
  }
);
//delete tag
export const deleteTagAsync = createAsyncThunk(
  "tags/deleteTag",
  async (id: string) => {
    try {
      const response = await deleteTag({ id });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "خطای ناشناخته در حذف هشتگ";
    }
  }
);
