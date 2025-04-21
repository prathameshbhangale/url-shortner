import { apiConnector } from "../axiosInstance";

const BASE_URL = String(import.meta.env.VITE_API_BASE_URL);
export const getUrls_url = `${BASE_URL}/api/url/myurls`;


export const getUrlsAPI = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      getUrls_url,
      {},
      {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    );
    return response?.data;
  } catch (error) {
    console.error("get urls API error:", error);
  }
  return null;
};
