import { IUser } from "@/interfaces/models/IUser";
import {
  createUser,
  deleteUser,
  fetchUserById,
  fetchUsers,
  updateUser,
} from "@/services/userServices/UserServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * توکن آسنکرون جهت دریافت لیست کاربر‌ها از API
 */
export const fetchUsersAsync = createAsyncThunk(
    "users/fetchUsers",
    async ({ page, size }: { page: number; size: number }) => {
      try {
        const response = await fetchUsers(page, size);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Unknown error fetching users");
      }
    }
  );

//fetch user by id
export const fetchUserByIdAsync = createAsyncThunk(
  "users/fetchUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: IUser = await fetchUserById({ id });
      return response ? response : null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در پیمایش تکی کاربر");
    }
  }
);

/**
 * توکن آسنکرون جهت ایجاد کاربر جدید با ارسال داده‌های کاربر به API
 */
export const createUserAsync = createAsyncThunk(
  "users/newUser",
  async (user: Omit<IUser, "id">, { rejectWithValue }) => {
    try {
      const response = await createUser(user);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ایجاد کاربر");
    }
  }
);

//edit user
export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (
    { id, user }: { id: string; user: Partial<IUser> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUser({ id, data: user });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("خطای ناشناخته در ویرایش کاربر");
    }
  }
);
//delete user
export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    try {
      const response = await deleteUser({ id });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "خطای ناشناخته در حذف کاربر";
    }
  }
);
