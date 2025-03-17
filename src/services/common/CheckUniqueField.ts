import axios from "axios";

export async function checkUniqueField(request: string) {
  try {
    const response = await axios.get(request);
    return response.data.length === 0 ? true : false;
  } catch (error) {
    console.error("Error checking unique field:", error);
    throw error;
  }
}
