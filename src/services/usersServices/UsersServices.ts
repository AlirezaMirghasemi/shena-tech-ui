import { IUser } from "@/interfaces/models/IUser";

//get all user
export async function fetchUsers() {
  try {
    const response = await fetch(
      "http://localhost:3001/users",
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function createUser( user: Omit<IUser, "id">) {
  try {
    const response = await fetch(
      "http://localhost:3001/users",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error Create new user:", error);
    throw error;
  }
}
