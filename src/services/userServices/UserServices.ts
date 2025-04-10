import { IUser } from "@/interfaces/models/IUser";
import axios from "axios";

//get all users
export async function fetchUsers(
  _page = 1,
  _per_page = 10
): Promise<{ data: IUser[]; totalCount: number }> {
  const response = await axios.get("http://localhost:3001/users", {
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
//create new user
export async function createUser(user: Omit<IUser, "id">) {
    console.log(user);
  try {
    const response = await axios.post("http://localhost:3001/users", user);
    return response.data;
  } catch (error) {
    console.error("Error Create new user:", error);
    throw error;
  }
}

//fetch user by id
export async function fetchUserById({ id }: { id: string }) {
  try {
    const response = await axios.get<IUser>(`http://localhost:3001/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

//update user by id
export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<IUser>;
}) => {
  try {
    const response = await axios.put(`http://localhost:3001/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

//delete user by id
export const deleteUser = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(`http://localhost:3001/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
