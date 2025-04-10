import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { IImage } from "@/interfaces/models/IImage";
import {
  createImageAsync,
  deleteImageAsync,
  fetchImageByIdAsync,
  //fetchImagesAsync,
  updateImageAsync,
} from "../thunks/imagesThunk";
//const PAGE_SIZE = 1;
// تعریف وضعیت اولیه اسلایس
interface ImagesState {
  data: IImage[];
  single: IImage | null;
  status: string;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ImagesState = {
  data: [],
  single: null,
  status: DataStatus.IDLE,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

/**
 * اسلایس ریداکس مربوط به عکس ها جهت مدیریت عملیات fetch و create
 */
export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {setCurrentPage(state, action) {
    state.currentPage = action.payload;
  },},
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری عکس ها
    // builder
    // .addCase(fetchImagesAsync.pending, (state) => {
    //     state.status = DataStatus.LOADING;
    //     state.error = null;
    //   })
    //   .addCase(fetchImagesAsync.fulfilled, (state, action) => {
    //     state.status = DataStatus.SUCCEEDED;
    //     state.data = action.payload.data;
    //     state.totalPages = Math.ceil(action.payload.totalCount / PAGE_SIZE);
    //   })
    //   .addCase(fetchImagesAsync.rejected, (state, action) => {
    //     state.status = DataStatus.FAILED;
    //     state.error = action.error.message || "Failed to fetch images";
    //   });
    // هندل کردن وضعیت بارگذاری عکس با شناسه
    builder
      .addCase(fetchImageByIdAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchImageByIdAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.single = action.payload;
      })
      .addCase(fetchImageByIdAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch images";
      })
      // هندل کردن وضعیت ایجاد عکس جدید
      .addCase(createImageAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(createImageAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = [action.payload];
      })
      .addCase(createImageAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to create image";
      })
      //هندل کردن بروزرسانی
      .addCase(updateImageAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(updateImageAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = state.data.map(image =>
          image.id === action.payload.id ? action.payload : image
        );
      })
      .addCase(updateImageAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to update image";
      })
      //delete image
            .addCase(deleteImageAsync.pending, (state) => {
              state.status = DataStatus.LOADING;
              state.error = null;
            })
            .addCase(deleteImageAsync.fulfilled, (state, action) => {
              state.status = DataStatus.SUCCEEDED;
              state.data = action.payload;
            })
            .addCase(deleteImageAsync.rejected, (state, action) => {
              state.status = DataStatus.FAILED;
              state.error = action.error.message || "Failed to update image";
            })
            ;
  },
});

export default imagesSlice.reducer;
export const { setCurrentPage } = imagesSlice.actions;
