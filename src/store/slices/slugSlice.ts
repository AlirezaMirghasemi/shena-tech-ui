import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { ISlug } from "@/interfaces/models/ISlug";
import {
  createSlugAsync,
  deleteSlugAsync,
  fetchSlugByIdAsync,
  fetchSlugsAsync,
  updateSlugAsync,
} from "../thunks/slugsThunk";
const PAGE_SIZE = 1;
// تعریف وضعیت اولیه اسلایس
interface SlugsState {
  data: ISlug[];
  single: ISlug | null;
  status: string;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: SlugsState = {
  data: [],
  single: null,
  status: DataStatus.IDLE,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

/**
 * اسلایس ریداکس مربوط به اسلاگ ها جهت مدیریت عملیات fetch و create
 */
export const slugsSlice = createSlice({
  name: "slugs",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری اسلاگ ها
    builder
      .addCase(fetchSlugsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchSlugsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.totalPages = Math.ceil(action.payload.totalCount / PAGE_SIZE);
      })
      .addCase(fetchSlugsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch slugs";
      });
    // هندل کردن وضعیت بارگذاری اسلاگ با شناسه
    builder
      .addCase(fetchSlugByIdAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchSlugByIdAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.single = action.payload;
      })
      .addCase(fetchSlugByIdAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch slugs";
      })
      // هندل کردن وضعیت ایجاد اسلاگ جدید
      .addCase(createSlugAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(createSlugAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(createSlugAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to create slug";
      })
      //هندل کردن بروزرسانی
      .addCase(updateSlugAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(updateSlugAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = state.data.map((slug) =>
          slug.id === action.payload.id ? action.payload : slug
        );
      })
      .addCase(updateSlugAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to update slug";
      })
      //delete slug
      .addCase(deleteSlugAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteSlugAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteSlugAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to update slug";
      });
  },
});

export default slugsSlice.reducer;
export const { setCurrentPage } = slugsSlice.actions;
