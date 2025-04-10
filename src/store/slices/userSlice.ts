import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "@/constants/data/DataStatus";
import { IUser } from "@/interfaces/models/IUser";
import {
  createUserAsync,
  deleteUserAsync,
  fetchUserByIdAsync,
  fetchUsersAsync,
  updateUserAsync,
} from "../thunks/usersThunk";
const PAGE_SIZE = 1;
// تعریف وضعیت اولیه اسلایس
interface UsersState {
  data: IUser[];
  single: IUser | null;
  status: string;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: UsersState = {
  data: [],
  single: null,
  status: DataStatus.IDLE,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

/**
 * اسلایس ریداکس مربوط به کاربر ها جهت مدیریت عملیات fetch و create
 */
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {setCurrentPage(state, action) {
    state.currentPage = action.payload;
  },},
  extraReducers: (builder) => {
    // هندل کردن وضعیت بارگذاری کاربر ها
    builder
    .addCase(fetchUsersAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.totalPages = Math.ceil(action.payload.totalCount / PAGE_SIZE);
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch users";
      });
    // هندل کردن وضعیت بارگذاری کاربر با شناسه
    builder
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.single = action.payload;
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch users";
      })
      // هندل کردن وضعیت ایجاد کاربر جدید
      .addCase(createUserAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to create user";
      })
      //هندل کردن بروزرسانی
      .addCase(updateUserAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.data = state.data.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to update user";
      })
      //delete user
            .addCase(deleteUserAsync.pending, (state) => {
              state.status = DataStatus.LOADING;
              state.error = null;
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
              state.status = DataStatus.SUCCEEDED;
              state.data = action.payload;
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
              state.status = DataStatus.FAILED;
              state.error = action.error.message || "Failed to update user";
            })
            ;
  },
});

export default usersSlice.reducer;
export const { setCurrentPage } = usersSlice.actions;
