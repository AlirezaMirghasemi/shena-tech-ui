import { IRole } from "@/interfaces/models/IRole";

//get all soles
export async function fetchRoles() {
  try {
    const response = await fetch(
      "http://localhost:3001/roles",
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IRole[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
}

export async function createRole( role: Omit<IRole, "id">) {
  try {
    const response = await fetch(
      "http://localhost:3001/roles",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(role),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error Create new role:", error);
    throw error;
  }
}
