import { ISlug } from "@/interfaces/models/ISlug";

//get all slugs
export async function fetchSlugs() {
  try {
    const response = await fetch(
      "http://localhost:3001/slugs",
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ISlug[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching slugs:", error);
    throw error;
  }
}

export async function createSlug( slug: Omit<ISlug, "id">) {
  try {
    const response = await fetch(
      "http://localhost:3001/slugs",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(slug),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error Create new slug:", error);
    throw error;
  }
}
