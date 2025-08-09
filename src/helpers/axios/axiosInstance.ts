import axios from "axios";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/local-storage";
import { getNewAccessToken } from "../../services/action/auth.services";

// Create Axios instance
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getFromLocalStorage("auth_key");
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    const isRefreshCall = originalRequest?.url?.includes("/auth/refresh-token");
    const shouldRetry =
      (error?.response?.status === 401 || error?.response?.status === 403) &&
      !originalRequest.__isRetryRequest &&
      !isRefreshCall;

    if (shouldRetry) {
      try {
        const response = await getNewAccessToken();
        console.log(response);
        const newAccessToken = response?.data?.data?.accessToken;

        if (!newAccessToken) {
          throw new Error("Refresh token did not return new access token");
        }

        setToLocalStorage("auth_key", newAccessToken);

        originalRequest.__isRetryRequest = true;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.error("🔴 Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { instance };
