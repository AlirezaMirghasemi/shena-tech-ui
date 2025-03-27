import { createSlice } from "@reduxjs/toolkit";
import { createTagAsync, fetchTagsAsync } from "../thunks/tagsThunk";
import { ITag } from "@/interfaces/models/ITag";
import { DataStatus } from "@/constants/data/DataStatus";

// تعریف وضعیت اولیه اسلایس
interface TagsState {
  data: ITag[];
  status: string;
  error: string | null;
}

const initialState: TagsState = {
  data: [],
  status: DataStatus.IDLE,
  error: null,
};

/**
 * اسلایس ریداکس مربوط به تگ‌ها جهت مدیریت عملیات fetch و create
 */
export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری تگ‌ها
    builder
      .addCase(fetchTagsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchTagsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch tags";
      })
      // هندل کردن وضعیت ایجاد تگ جدید
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
      });
  },
});

export default tagsSlice.reducer;
