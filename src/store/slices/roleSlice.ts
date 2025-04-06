import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { IRole } from "@/interfaces/models/IRole";
import {
  createRoleAsync,
  deleteRoleAsync,
  fetchRoleByIdAsync,
  fetchRolesAsync,
  updateRoleAsync,
} from "../thunks/rolesThunk";

// تعریف وضعیت اولیه اسلایس
interface RolesState {
  data: IRole[];
  single: IRole | null;
  status: string;
  error: string | null;
}

const initialState: RolesState = {
  data: [],
  single: null,
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
        state.data = action.payload as IRole[];
      })
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch roles";
      });
    // هندل کردن وضعیت بارگذاری نقش با شناسه
    builder
      .addCase(fetchRoleByIdAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchRoleByIdAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.single = action.payload;
      })
      .addCase(fetchRoleByIdAsync.rejected, (state, action) => {
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
      })
      //هندل کردن بروزرسانی
      .addCase(updateRoleAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(updateRoleAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = state.data.map(role =>
          role.id === action.payload.id ? action.payload : role
        );
      })
      .addCase(updateRoleAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to update role";
      })
      //delete role
      .addCase(deleteRoleAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteRoleAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteRoleAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to update role";
      })
      ;
  },
});

export default rolesSlice.reducer;
