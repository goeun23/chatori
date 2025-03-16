import { env } from "@/config/env";
import { paths } from "@/config/paths";
// 또는 한 줄로 작성
import axios, { InternalAxiosRequestConfig } from "axios";
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  config.withCredentials = true;
  return config;
}

export const api = axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    if (error.response?.status == 401) {
      const searchParmas = new URLSearchParams();
      const redirectTo =
        searchParmas.get("redirectTo") || window.location.pathname;

      window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  }
);
