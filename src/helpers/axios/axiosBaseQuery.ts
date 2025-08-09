/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { toast } from "sonner";
import type { RootState } from "../../redux/store";
import { logout, setUser } from "../../redux/features/auth/authSlice";
import { instance } from "./axiosInstance";

type AxiosBaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
  async ({ url, method, data, params }, api) => {
    try {
      const result = await instance({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<any>;

      // Error handling
      if (err.response?.status === 404) {
        toast.error(err.response?.data?.message || "Not Found");
      }

      if (err.response?.status === 403) {
        toast.error(err.response?.data?.message || "Forbidden");
      }

      if (err.response?.status === 401) {
        console.log("Sending refresh token request...");

        try {
          const refreshRes = await instance.post(
            "/auth/refresh-token",
            { withCredentials: true }
          );

          const data = refreshRes.data;
          if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;

            api.dispatch(
              setUser({
                user,
                token: data.data.accessToken,
              })
            );

            // Retry the original request
            const retryResult = await instance({
              url,
              method,
              data,
              params,
              headers: {
                Authorization: `${data.data.accessToken}`,
              },
            });

            return { data: retryResult.data };
          } else {
            api.dispatch(logout());
          }
        } catch {
          api.dispatch(logout());
        }
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
