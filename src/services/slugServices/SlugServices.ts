import { ISlug } from "@/interfaces/models/ISlug";
import axios from "axios";

//get all slugs
export async function fetchSlugs() {
  try {
    const response = await axios.get<ISlug[]>("http://localhost:3001/slugs");
    return response.data;
  } catch (error) {
    console.error("Error fetching slugs:", error);
    throw error;
  }
}
//create new slug
export async function createSlug(slug: Omit<ISlug, "id">) {
  try {
    const response = await axios.post("http://localhost:3001/slugs", slug);
    return response.data;
  } catch (error) {
    console.error("Error Create new slug:", error);
    throw error;
  }
}
