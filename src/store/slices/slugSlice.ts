
import { ISlug } from "@/interfaces/models/ISlug";
import { createSlice } from "@reduxjs/toolkit";
import { createSlugAsync, fetchSlugsAsync } from "../thunks/slugsThunk";


const initialState = {
  slugs: [] as ISlug[],
  loading: false,
  error: null as string | null,
};
export const slugsSlice = createSlice({
  name: "slugs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchSlugsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlugsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.slugs = action.payload;
      })
      .addCase(fetchSlugsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tags";
      })
      .addCase(createSlugAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSlugAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.slugs.push(action.payload);
      })
      .addCase(createSlugAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
