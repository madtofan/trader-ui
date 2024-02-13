import { ObtainTokenResponse } from "@/bindings/user/ObtainTokenResponse";
import { RefreshtokenEndpointRequest } from "@/bindings/user/RefreshtokenEndpointRequest";
import { API_SERVER, refreshEndpoint } from "@/config/api";
import axios from "axios";

export const initializeAxiosClient = () => {
  const axiosClient = axios.create({
    baseURL: API_SERVER,
  })
  console.log("initializing");

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && (error.response.status === 400 || error.response.status === 403)) {
        const isRefreshed = await refreshToken();
        if (isRefreshed) {
          const bearerToken = localStorage.getItem("bearerToken");
          error.config.headers['authorization'] = `Bearer ${bearerToken}`;
          return axiosClient(error.config);
        }
        localStorage.setItem("bearerToken", '');
        localStorage.setItem("refreshToken", '');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosClient;
}

const refreshToken = async () => {
  const token = localStorage.getItem("refreshToken") || "invalidToken";
  let data: RefreshtokenEndpointRequest = {
    token
  };
  try {
    const res = await axios.post<ObtainTokenResponse>(refreshEndpoint(), data);
    localStorage.setItem("bearerToken", res.data.bearer_token);
    localStorage.setItem("refreshToken", res.data.refresh_token);
    return res.status === 200;

  } catch {
    return false;
  }
}
