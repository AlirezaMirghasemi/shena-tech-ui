import { IImage } from "@/interfaces/models/IImage";
import axios from "axios";
import { uploadFile } from "../common/uploadFile";
import { deleteFile } from "../common/deleteFile";

// //get all images
// export async function fetchImages(
//   _page = 1,
//   _per_page = 10
// ): Promise<{ data: IImage[]; totalCount: number }> {
//   const response = await axios.get("http://localhost:3001/images", {
//     params: {
//       _page,
//       _per_page,
//     },
//   });
//   return {
//     data: response.data.data || [],
//     totalCount: response.data.pages || 0,
//   };
// }
//create new image
export async function createImage(
  image: Omit<IImage, "id">,
  imageFile: File
): Promise<IImage> {
  try {
    // آپلود فایل و دریافت اطلاعات اولیه عکس
    const uploadResult: IImage = await uploadFile(imageFile, image.type);
    image.title = uploadResult.title;
    image.directory = uploadResult.directory;
    const response = await axios.post("http://localhost:3001/images", image);
    return response.data;
  } catch (error) {
    console.error("Error Create new image:", error);
    throw error;
  }
}

//fetch image by id
export async function fetchImageById({ id }: { id: string }) {
  try {
    const response = await axios.get<IImage>(
      `http://localhost:3001/images/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting image:", error);
    throw error;
  }
}

//update image by id
export const updateImage = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<IImage>;
}) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/images/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating image:", error);
    throw error;
  }
};

//delete image by id
export const deleteImage = async ({ id,imageDirectory }: { id: string ,imageDirectory:string}) => {
  try {
    await deleteFile(imageDirectory); // یا به جای "profile" از مقدار متناسب با ImageType استفاده کنید.
    const response = await axios.delete(`http://localhost:3001/images/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
