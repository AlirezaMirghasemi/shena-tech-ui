import axios from "axios";
import Error from "next/error";

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("profilePicture", file);

  try {
    const response = await axios.post("/api/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.filename;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "آپلود فایل با مشکل مواجه شد"
    );
  }
};
