const BASE_URL = String(import.meta.env.VITE_API_BASE_URL);
export const register_url = `${BASE_URL}/api/auth/public/register`;

import { apiConnector } from "../axiosInstance";

export const registerApi = async (data) => {
    try {
      const response = await apiConnector("POST", register_url, data);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error("Register API error:", error);
    }
    return null;
  };