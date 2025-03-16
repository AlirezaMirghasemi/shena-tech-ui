import { IRole } from "@/interfaces/models/IRole";
import { createRole, fetchRoles } from "@/services/roleServices/RoleServices";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchRolesAsync = createAsyncThunk(
  "roles/fetchRoles",
  async () => {
    const response: IRole[] = await fetchRoles();
    return response;
  }
);
export const createRoleAsync = createAsyncThunk(
  "roles/newRole",
  async (role: Omit<IRole, "id">, { rejectWithValue }) => {
    try {
      const response = await createRole(role);
      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("خطای ناشناخته در ایجاد نقش");
    }
  }
);
