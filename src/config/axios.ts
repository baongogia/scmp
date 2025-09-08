/* eslint-disable @typescript-eslint/no-explicit-any */

// import { showError } from "@/hooks/useNotification";
import { getCookie } from "@/utils/client/getCookie";
import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const publicEndpoints = [
  "/v1/auth/login",
  "/v1/auth/refresh-token",
  "/v1/auth/register",
  "/v1/auth/reset-password",
];

function isPublicEndpoint(url: string) {
  return publicEndpoints.some((endpoint) => url.includes(endpoint));
}

// Add a request interceptor
api.interceptors.request.use(async function (config) {
  const token = getCookie("token");
  const refreshToken = getCookie("refreshToken");

  if (isPublicEndpoint(config.url || "")) {
    config.headers["X-Tenant-ID"] = "VNCMY";
    return config;
  }

  if (!token) {
    return Promise.reject(new Error("No token"));
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    const currentTime = Math.floor(Date.now() / 1000);
    const expDate = payload.exp;
    const timeLeft = expDate - currentTime;
    const timeLeftInMinutes = Math.floor(timeLeft / 60);

    // CHỈ refresh token, không logout
    let refreshPromise: Promise<any> | null = null;
    if (timeLeftInMinutes > 0 && timeLeftInMinutes < 8) {
      if (!refreshPromise) {
        try {
          refreshPromise = axios
            .post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh-token`,
              {
                refreshToken: refreshToken,
              }
            )
            .finally(() => {
              refreshPromise = null;
            });

          const res = await refreshPromise;
          document.cookie = `token=${res.data.accessToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; secure; SameSite=Strict`;
          document.cookie = `refreshToken=${res.data.refreshToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; secure; SameSite=Strict`;

          config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        } catch (refreshError) {
          console.log("refreshError:", refreshError);
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (decodeError) {
    console.log("decodeError:", decodeError);
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["X-Tenant-ID"] = "VNCMY";
  return config;
});

export default api;
