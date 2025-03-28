import { IPermission } from "@/interfaces/models/IPermission";
import { createPermission, fetchPermissions } from "@/services/permissionServices/PermissionServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * توکن آسنکرون جهت دریافت لیست مجوز‌ها از API
 */
export const fetchPermissionsAsync = createAsyncThunk("permissions/fetchPermissions", async () => {
  const response: IPermission[] = await fetchPermissions();
  return response ? response : [];
});

/**
 * توکن آسنکرون جهت ایجاد مجوز جدید با ارسال داده‌های مجوز به API
 */
export const createPermissionAsync = createAsyncThunk(
  "permissions/newPermission",
  async (permission: Omit<IPermission, "id">, { rejectWithValue }) => {
    try {
      const response = await createPermission(permission);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ایجاد مجوز");
    }
  }
);
