import { instance } from "../../helpers/axios/axiosInstance";

export const getNewAccessToken = async () => {
  return await instance({
    url: `http://localhost:5000/api/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
