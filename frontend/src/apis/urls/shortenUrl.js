import { apiConnector } from "../axiosInstance";

const BASE_URL = String(import.meta.env.VITE_API_BASE_URL);
export const getUrls_url = `${BASE_URL}/api/url/shorten`;

export const getShortenUrlAPI = async (token,body) => {
  try {
    const response = await apiConnector(
      "POST",
      getUrls_url,
      body,
      {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    );
    return response?.data;
  } catch (error) {
    console.error("shorte url API error:", error);
  }
  return null;
};
