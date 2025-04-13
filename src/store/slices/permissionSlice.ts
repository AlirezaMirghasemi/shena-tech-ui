import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { IPermission } from "@/interfaces/models/IPermission";
import {
  createPermissionAsync,
  deletePermissionAsync,
  fetchPermissionByIdAsync,
  fetchPermissionsAsync,
  fetchRolePermissionsAsync,
  updatePermissionAsync,
} from "../thunks/permissionsThunk";

const PAGE_SIZE = 1;
// تعریف وضعیت اولیه اسلایس
interface PermissionsState {
  data: IPermission[];
  single: IPermission | null;
  status: string;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: PermissionsState = {
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
export const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری هشتگ ها
    builder
      .addCase(fetchPermissionsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchPermissionsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.totalPages = Math.ceil(action.payload.totalCount / PAGE_SIZE);
      })
      .addCase(fetchPermissionsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch permissions";
      });
    // هندل کردن وضعیت بارگذاری هشتگ با شناسه
    builder
      .addCase(fetchPermissionByIdAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchPermissionByIdAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.single = action.payload;
      })
      .addCase(fetchPermissionByIdAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch permissions";
      })
      // هندل کردن وضعیت ایجاد هشتگ جدید
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
      })
      //هندل کردن بروزرسانی
      .addCase(updatePermissionAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(updatePermissionAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = state.data.map((permission) =>
          permission.id === action.payload.id ? action.payload : permission
        );
      })
      .addCase(updatePermissionAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to update permission";
      })
      //delete permission
      .addCase(deletePermissionAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(deletePermissionAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deletePermissionAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to update permission";
      })
      //fetch Role Permissions
      .addCase(fetchRolePermissionsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchRolePermissionsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchRolePermissionsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch role permissions";
      });
  },
});

export default permissionsSlice.reducer;
export const { setCurrentPage } = permissionsSlice.actions;
