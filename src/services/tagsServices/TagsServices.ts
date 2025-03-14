import { ITag } from "@/interfaces/models/ITag";
//get all tags
export async function fetchTags() {
  try {
    const response = await fetch(
      "https://67cb06163395520e6af40773.mockapi.io/shenatech/tags",
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ITag[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}
