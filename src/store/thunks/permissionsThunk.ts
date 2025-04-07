import { IPermission } from "@/interfaces/models/IPermission";
import {
  createPermission,
  deletePermission,
  fetchPermissionById,
  fetchPermissions,
  updatePermission,
} from "@/services/permissionServices/PermissionServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * توکن آسنکرون جهت دریافت لیست مجوز‌ها از API
 */
export const fetchPermissionsAsync = createAsyncThunk(
  "permissions/fetchPermissions",
  async ({ page, size }: { page: number; size: number }) => {
    try {
      const response = await fetchPermissions(page, size);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error fetching permissions");
    }
  }
);

//fetch permission by id
export const fetchPermissionByIdAsync = createAsyncThunk(
  "permissions/fetchPermissionById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: IPermission = await fetchPermissionById({ id });
      return response ? response : null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در پیمایش تکی مجوز");
    }
  }
);

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
//edit permission
export const updatePermissionAsync = createAsyncThunk(
  "permissions/updatePermission",
  async (
    { id, permission }: { id: string; permission: Partial<IPermission> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updatePermission({ id, data: permission });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ویرایش مجوز");
    }
  }
);

//delete permission
export const deletePermissionAsync = createAsyncThunk(
  "permissions/deletePermission",
  async (id: string) => {
    try {
      const response = await deletePermission({ id });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "خطای ناشناخته در حذف مجوز";
    }
  }
);
