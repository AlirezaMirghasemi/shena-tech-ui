import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { IRole } from "@/interfaces/models/IRole";
import { createRoleAsync, fetchRolesAsync } from "../thunks/rolesThunk";

// تعریف وضعیت اولیه اسلایس
interface RolesState {
  data: IRole[];
  status: string;
  error: string | null;
}

const initialState: RolesState = {
  data: [],
  status: DataStatus.IDLE,
  error: null,
};

/**
 * اسلایس ریداکس مربوط به نقش ها جهت مدیریت عملیات fetch و create
 */
export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری نقش ها
    builder
      .addCase(fetchRolesAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch roles";
      })
      // هندل کردن وضعیت ایجاد نقش جدید
      .addCase(createRoleAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(createRoleAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(createRoleAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to create role";
      });
  },
});

export default rolesSlice.reducer;
