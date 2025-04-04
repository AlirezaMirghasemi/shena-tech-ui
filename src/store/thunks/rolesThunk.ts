import { IRole } from "@/interfaces/models/IRole";
import {
  createRole,
  fetchRoleById,
  fetchRoles,
  updateRole
} from "@/services/roleServices/RoleServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * توکن آسنکرون جهت دریافت لیست نقش‌ها از API
 */
export const fetchRolesAsync = createAsyncThunk(
  "roles/fetchRoles",
  async () => {
    const response: IRole[] = await fetchRoles();
    return response ? response : [];
  }
);

//fetch role by id
export const fetchRoleByIdAsync = createAsyncThunk(
  "roles/fetchRoleById",
  async (id: string) => {
    const response: IRole = await fetchRoleById({ id });
    return response ? response : null;
  }
);

/**
 * توکن آسنکرون جهت ایجاد نقش جدید با ارسال داده‌های نقش به API
 */
export const createRoleAsync = createAsyncThunk(
  "roles/newRole",
  async (role: Omit<IRole, "id">, { rejectWithValue }) => {
    try {
      const response = await createRole(role);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ایجاد نقش");
    }
  }
);

//edit role
export const updateRoleAsync = createAsyncThunk(
    "roles/updateRole",
    async ({id, role}: {id: string; role: Partial<IRole>}, {rejectWithValue}) => {
      try {
        const response = await updateRole({id, data: role});
        return response;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue("خطای ناشناخته در ویرایش نقش");
      }
    }
  );
