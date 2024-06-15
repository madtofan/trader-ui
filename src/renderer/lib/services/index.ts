import axios from 'axios';
import { CONTEXT_KEYS, STORE_CHANNELS } from '@/../shared-types';
import { ObtainTokenResponse } from '@/bindings/user/ObtainTokenResponse';
import { RefreshtokenEndpointRequest } from '@/bindings/user/RefreshtokenEndpointRequest';
import { API_SERVER, refreshEndpoint } from '@/lib/config/api';

const refreshToken = async () => {
  const token = localStorage.getItem('refreshToken');
  if (!token) {
    return false;
  }
  const data: RefreshtokenEndpointRequest = {
    token,
  };
  try {
    const res = await axios.post<ObtainTokenResponse>(refreshEndpoint(), data);
    localStorage.setItem('bearerToken', res.data.bearer_token);
    localStorage.setItem('refreshToken', res.data.refresh_token);
    return res.status === 200;
  } catch {
    return false;
  }
};

export const initializeAxiosClient = () => {
  const axiosClient = axios.create({
    baseURL: API_SERVER,
  });

  axiosClient.interceptors.request.use((config) => {
    const bearerToken = localStorage.getItem('bearerToken');
    config.headers.authorization = bearerToken ? `Bearer ${bearerToken}` : '';
    axios.defaults.headers.post['Content-Type'] =
      'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.code === 'ERR_NETWORK') {
        localStorage.setItem('bearerToken', '');
        localStorage.setItem('refreshToken', '');
        window.electron.ipcRenderer.invoke(
          STORE_CHANNELS.Set,
          CONTEXT_KEYS.loggedIn,
          false,
        );
        window.location.href = '/';
      }
      if (error.response && error.response.status === 401) {
        const isRefreshed = await refreshToken();
        if (isRefreshed) {
          window.electron.ipcRenderer.invoke(
            STORE_CHANNELS.Set,
            CONTEXT_KEYS.loggedIn,
            true,
          );
          const bearerToken = localStorage.getItem('bearerToken');
          error.config.headers.Authorization = `Bearer ${bearerToken}`;
          return axiosClient(error.config);
        }
        localStorage.setItem('bearerToken', '');
        localStorage.setItem('refreshToken', '');
        window.electron.ipcRenderer.invoke(
          STORE_CHANNELS.Set,
          CONTEXT_KEYS.loggedIn,
          false,
        );
        window.location.href = '/';
      }
      return Promise.reject(error);
    },
  );

  return axiosClient;
};
