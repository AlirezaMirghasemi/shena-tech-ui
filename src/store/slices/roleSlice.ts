import { IRole } from "@/interfaces/models/IRole";
import { createSlice } from "@reduxjs/toolkit";
import { createRoleAsync, fetchRolesAsync } from "../thunks/rolesThunk";




const initialState = {
  roles: [] as IRole[],
  loading: false,
  error: null as string | null,
};
export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchRolesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tags";
      })
      .addCase(createRoleAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createRoleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
