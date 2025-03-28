import { IRole } from "@/interfaces/models/IRole";
import axios from "axios";

//get all roles
export async function fetchRoles() {
  try {
    const response = await axios.get<IRole[]>("http://localhost:3001/roles");
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
}
//create new role
export async function createRole(role: Omit<IRole, "id">) {
  try {
    const response=await axios.post("http://localhost:3001/roles", role);
    return response.data;
  } catch (error) {
    console.error("Error Create new role:", error);
    throw error;
  }
}
