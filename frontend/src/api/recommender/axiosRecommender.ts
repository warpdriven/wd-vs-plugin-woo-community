// Axios Imports
import axios, { AxiosError } from "axios";

// Utils Imports
import { getJsonSettings } from "@/utils";

export const axiosRecommender = axios.create({
  baseURL: import.meta.env.VITE_VS_RECOMMENDER,
  timeout: 1000 * 60,
});

axiosRecommender.interceptors.request.use((config) => {
  const settings = getJsonSettings();

  if (settings) {
    config.headers.setAuthorization(settings.wd_api_key, false);
  }

  return config;
});
axiosRecommender.interceptors.response.use(
  (res) => {
    const { data } = res;

    return data;
  },
  (error: AxiosError) => {
    throw new Error(error.message);
  }
);
