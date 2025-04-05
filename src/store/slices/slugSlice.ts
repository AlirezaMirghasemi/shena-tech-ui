import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { ISlug } from "@/interfaces/models/ISlug";
import {
  createSlugAsync,
  fetchSlugByIdAsync,
  fetchSlugsAsync,
  updateSlugAsync,
} from "../thunks/slugsThunk";

// تعریف وضعیت اولیه اسلایس
interface SlugsState {
  data: ISlug[];
  single: ISlug | null;
  status: string;
  error: string | null;
}

const initialState: SlugsState = {
  data: [],
  single: null,
  status: DataStatus.IDLE,
  error: null,
};

/**
 * اسلایس ریداکس مربوط به اسلاگ ها جهت مدیریت عملیات fetch و create
 */
export const slugsSlice = createSlice({
  name: "slugs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری اسلاگ ها
    builder
      .addCase(fetchSlugsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchSlugsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload as ISlug[];
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
      });
  },
});

export default slugsSlice.reducer;
