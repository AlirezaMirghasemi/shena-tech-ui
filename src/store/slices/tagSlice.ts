import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { ITag } from "@/interfaces/models/ITag";
import {
  createTagAsync,
  fetchTagByIdAsync,
  fetchTagsAsync,
  updateTagAsync,
} from "../thunks/tagsThunk";

// تعریف وضعیت اولیه اسلایس
interface TagsState {
  data: ITag[];
  single: ITag | null;
  status: string;
  error: string | null;
}

const initialState: TagsState = {
  data: [],
  single: null,
  status: DataStatus.IDLE,
  error: null,
};

/**
 * اسلایس ریداکس مربوط به هشتگ ها جهت مدیریت عملیات fetch و create
 */
export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری هشتگ ها
    builder
      .addCase(fetchTagsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload as ITag[];
      })
      .addCase(fetchTagsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch tags";
      });
    // هندل کردن وضعیت بارگذاری هشتگ با شناسه
    builder
      .addCase(fetchTagByIdAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchTagByIdAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.single = action.payload;
      })
      .addCase(fetchTagByIdAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch tags";
      })
      // هندل کردن وضعیت ایجاد هشتگ جدید
      .addCase(createTagAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(createTagAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(createTagAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to create tag";
      })
      //هندل کردن بروزرسانی
      .addCase(updateTagAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(updateTagAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = state.data.map(tag =>
          tag.id === action.payload.id ? action.payload : tag
        );
      })
      .addCase(updateTagAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to update tag";
      });
  },
});

export default tagsSlice.reducer;
