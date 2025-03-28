import { IPermission } from "@/interfaces/models/IPermission";
import axios from "axios";

//get all permissions
export async function fetchPermissions() {
  try {
    const response = await axios.get<IPermission[]>(
      "http://localhost:3001/permissions"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
}
//create new permission
export async function createPermission(permission: Omit<IPermission, "id">) {
  try {
    const response = await axios.post(
      "http://localhost:3001/permissions",
      permission
    );
    return response.data;
  } catch (error) {
    console.error("Error Create new permission:", error);
    throw error;
  }
}
