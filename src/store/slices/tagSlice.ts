import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { ITag } from "@/interfaces/models/ITag";
import {
  createTagAsync,
  deleteTagAsync,
  fetchTagByIdAsync,
  fetchTagsAsync,
  updateTagAsync,
} from "../thunks/tagsThunk";
const PAGE_SIZE = 1;
// تعریف وضعیت اولیه اسلایس
interface TagsState {
  data: ITag[];
  single: ITag | null;
  status: string;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: TagsState = {
  data: [],
  single: null,
  status: DataStatus.IDLE,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

/**
 * اسلایس ریداکس مربوط به هشتگ ها جهت مدیریت عملیات fetch و create
 */
export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {setCurrentPage(state, action) {
    state.currentPage = action.payload;
  },},
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری هشتگ ها
    builder
    .addCase(fetchTagsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.totalPages = Math.ceil(action.payload.totalCount / PAGE_SIZE);
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
      })
      //delete tag
            .addCase(deleteTagAsync.pending, (state) => {
              state.status = DataStatus.LOADING;
              state.error = null;
            })
            .addCase(deleteTagAsync.fulfilled, (state, action) => {
              state.status = DataStatus.SUCCEEDED;
              state.data = action.payload;
            })
            .addCase(deleteTagAsync.rejected, (state, action) => {
              state.status = DataStatus.FAILED;
              state.error = action.error.message || "Failed to update tag";
            })
            ;
  },
});

export default tagsSlice.reducer;
export const { setCurrentPage } = tagsSlice.actions;
