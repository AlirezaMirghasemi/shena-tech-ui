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
