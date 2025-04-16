import axios from "axios";

export const axiosInstance = axios.create();

export const apiConnector = async (
  method,
  url,
  bodyData = null,
  headers = undefined,
  params = undefined
) => {
  const config = {
    method,
    url,
    data: bodyData,
    headers,
    params,
  };

  try {
    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    throw error;
  }
};
