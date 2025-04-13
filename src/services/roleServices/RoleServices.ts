import { IRole } from "@/interfaces/models/IRole";
import axios from "axios";

export async function fetchRoles(
  page = 1,
  perPage = 10
): Promise<{ data: IRole[]; totalCount: number }> {
  const response = await axios.get("http://localhost:3001/roles", {
    params: {
      _page: page,
      _per_page: perPage,
    },
  });
  return {
    data: response.data.data || [],
    totalCount: response.data.pages || 0,
  };
}


//create new role
export async function createRole(role: Omit<IRole, "id">) {
  try {
    const response = await axios.post("http://localhost:3001/roles", role);
    return response.data;
  } catch (error) {
    console.error("Error Create new role:", error);
    throw error;
  }
}

//fetch role by id
export async function fetchRoleById({ id }: { id: string }) {
  try {
    const response = await axios.get<IRole>(
      `http://localhost:3001/roles/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting role:", error);
    throw error;
  }
}

//update role by id
export const updateRole = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<IRole>;
}) => {
  try {
    const response = await axios.put(`http://localhost:3001/roles/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

//delete role by id
export const deleteRole = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(`http://localhost:3001/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};
