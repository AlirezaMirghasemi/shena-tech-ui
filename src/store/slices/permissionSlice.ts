import { DataStatus } from "@/constants/data/DataStatus";
import { IPermission } from "@/interfaces/models/IPermission";
import {
  createPermissionAsync,
  fetchPermissionsAsync,
} from "../thunks/permissionThunk";
import { createSlice } from "@reduxjs/toolkit";

// تعریف وضعیت اولیه اسلایس
interface PermissionsState {
  data: IPermission[];
  status: string;
  error: string | null;
}

const initialState: PermissionsState = {
  data: [],
  status: DataStatus.IDLE,
  error: null,
};

/**
 * اسلایس ریداکس مربوط به مجوز ها جهت مدیریت عملیات fetch و create
 */
export const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری مجوز‌ها
    builder
      .addCase(fetchPermissionsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchPermissionsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchPermissionsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch permissions";
      })
      // هندل کردن وضعیت ایجاد مجوز جدید
      .addCase(createPermissionAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(createPermissionAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(createPermissionAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to create permission";
      });
  },
});

export default permissionsSlice.reducer;
