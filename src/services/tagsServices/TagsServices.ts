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

export async function createTag( tag: Omit<ITag, "id">) {
  try {
    const response = await fetch(
      "https://67cb06163395520e6af40773.mockapi.io/shenatech/tags",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tag),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error Create new tag:", error);
    throw error;
  }
}
