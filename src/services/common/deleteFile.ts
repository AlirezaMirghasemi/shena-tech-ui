// services/common/deleteFile.ts
import axios from "axios";

/**
 * حذف فایل از سرور
 * @param filename نام فایل جهت حذف (مثلاً "profile-1634234234-uuid.jpg")
 * @param type نوع تصویر (که طبق انام تعریف شده مانند ImageType.PROFILE یا ImageType.COVER خواهد بود)
 * @returns شیء حاوی پیام موفقیت‌آمیز بودن عملیات
 */
export const deleteFile = async (fileDirectory:string): Promise<{ message: string }> => {
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
