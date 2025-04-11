// services/common/deleteFile.ts
import axios from "axios";

/**
 * حذف فایل از سرور
 * @returns شیء حاوی پیام موفقیت‌آمیز بودن عملیات
 */
export const deleteFile = async (
  fileDirectory: string
): Promise<{ message: string }> => {
  try {
    const response = await axios.delete("/api/deleteFile", {
      params: { fileDirectory },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "خطا در حذف فایل");
    } else {
      throw new Error("خطا در حذف فایل");
    }
  }
};
