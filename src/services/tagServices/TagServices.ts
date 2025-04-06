import { ITag } from "@/interfaces/models/ITag";
import axios from "axios";

//get all tags
export async function fetchTags() {
  try {
    const response = await axios.get<ITag[]>("http://localhost:3001/tags");
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}
//create new tag
export async function createTag(tag: Omit<ITag, "id">) {
  try {
    const response = await axios.post("http://localhost:3001/tags", tag);
    return response.data;
  } catch (error) {
    console.error("Error Create new tag:", error);
    throw error;
  }
}

//fetch tag by id
export async function fetchTagById({ id }: { id: string }) {
  try {
    const response = await axios.get<ITag>(
      `http://localhost:3001/tags/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting tag:", error);
    throw error;
  }
}

//update tag by id
export const updateTag = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<ITag>;
}) => {
  try {
    const response = await axios.put(`http://localhost:3001/tags/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating tag:", error);
    throw error;
  }
};

//delete tag by id
export const deleteTag = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(`http://localhost:3001/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw error;
  }
};
