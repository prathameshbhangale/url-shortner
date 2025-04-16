import { apiConnector } from "../axiosInstance";

const BASE_URL = String(import.meta.env.VITE_API_BASE_URL);
export const login_url = `${BASE_URL}/api/auth/public/login`;

export const loginApi = async (data) => {
  try {
    const response = await apiConnector("POST", login_url, data);
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    console.error("Login API error:", error);
  }
  return null;
};