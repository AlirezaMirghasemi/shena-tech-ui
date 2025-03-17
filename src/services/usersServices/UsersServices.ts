import { IUser } from "@/interfaces/models/IUser";
import axios from "axios";

//get all user
export async function fetchUsers() {
  try {
    const response = await axios.get<IUser[]>("http://localhost:3001/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

//create new user
export async function createUser(user: Omit<IUser, "id">) {
  try {
    const response = await axios.post("http://localhost:3001/users", user);
    return response.data;
  } catch (error) {
    console.error("Error Create new user:", error);
    throw error;
  }
}
