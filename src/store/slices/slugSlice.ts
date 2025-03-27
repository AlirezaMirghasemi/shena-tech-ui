import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { ISlug } from "@/interfaces/models/ISlug";
import { createSlugAsync, fetchSlugsAsync } from "../thunks/slugsThunk";

// تعریف وضعیت اولیه اسلایس
interface SlugsState {
  data: ISlug[];
  status: string;
  error: string | null;
}

const initialState: SlugsState = {
  data: [],
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
        state.data = action.payload;
      })
      .addCase(fetchSlugsAsync.rejected, (state, action) => {
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
      });
  },
});

export default slugsSlice.reducer;
