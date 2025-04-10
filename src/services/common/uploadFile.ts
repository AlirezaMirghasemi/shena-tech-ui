import axios from "axios";
import { IImage } from "@/interfaces/models/IImage";

/**
 * آپلود فایل در سرور
 * @param file فایل انتخاب‌شده توسط کاربر
 * @param imageType نوع تصویر (مثلاً "profilePicture")
 * @returns شیء اطلاعات عکس مطابق با IImage
 */
export const uploadFile = async (file: File, imageType: string): Promise<IImage> => {
  const formData = new FormData();
  // کلید را به گونه‌ای ست می‌کنیم که در API به درستی دریافت شود
  formData.append("file", file);
  formData.append("type", imageType);

  try {
    const response = await axios.post("/api/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // توجه داشته باشید که API ما یک شیء تحت کلید imageRecord برمی‌گرداند.
    return response.data.imageRecord;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "آپلود فایل با مشکل مواجه شد"
      );
    } else {
      throw new Error("آپلود فایل با مشکل مواجه شد");
    }
  }
};
