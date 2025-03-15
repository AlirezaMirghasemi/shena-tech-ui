import { ITag } from "@/interfaces/models/ITag";
import { createSlice } from "@reduxjs/toolkit";
import { createTagAsync, fetchTagsAsync } from "../thunks/tagsThunk";


const initialState = {
  tags: [] as ITag[],
  loading: false,
  error: null as string | null,
};
export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTagsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTagsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tags";
      })
      .addCase(createTagAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTagAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tags.push(action.payload);
      })
      .addCase(createTagAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
