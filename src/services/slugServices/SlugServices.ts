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

//fetch slug by id
export async function fetchSlugById({ id }: { id: string }) {
  try {
    const response = await axios.get<ISlug>(
      `http://localhost:3001/slugs/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting slug:", error);
    throw error;
  }
}

//update slug by id
export const updateSlug = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<ISlug>;
}) => {
  try {
    const response = await axios.put(`http://localhost:3001/slugs/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating slug:", error);
    throw error;
  }
};

//delete slug by id
export const deleteSlug = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(`http://localhost:3001/slugs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting slug:", error);
    throw error;
  }
};
