import { IPermission } from "@/interfaces/models/IPermission";
import axios from "axios";

//get all permissions
export async function fetchPermissions(
  _page = 1,
  _per_page = 10
): Promise<{ data: IPermission[]; totalCount: number }> {
  const response = await axios.get("http://localhost:3001/permissions", {
    params: {
      _page,
      _per_page,
    },
  });
  return {
    data: response.data.data || [],
    totalCount: response.data.pages || 0,
  };
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

//fetch permission by id
export async function fetchPermissionById({ id }: { id: string }) {
  try {
    const response = await axios.get<IPermission>(
      `http://localhost:3001/permissions/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting permission:", error);
    throw error;
  }
}

//update permission by id
export const updatePermission = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<IPermission>;
}) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/permissions/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating permission:", error);
    throw error;
  }
};
//delete permission by id
export const deletePermission = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/permissions/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting permission:", error);
    throw error;
  }
};
