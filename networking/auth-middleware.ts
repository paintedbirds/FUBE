import { AxiosInstance } from "axios";
import { signOut } from "next-auth/react";

export const applyInterceptors = (client: AxiosInstance, token: string | undefined, clearSession: typeof signOut) => {
  const requestInterceptor = client.interceptors.request.use((request) => {
    if (token) {
      request.headers.Authorization = `Token ${token}`;
    } else {
      Object.assign(request.params);
    }

    return request;
  });

  const responseInterceptor = client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response || !error.response.data) {
        return Promise.reject({ message: 'Connection error' });
      }

      if (error.response.status === 401) {
        clearSession();
      }

      return Promise.reject(error.response.data);
    }
  );

  return [requestInterceptor, responseInterceptor];
};

export const clearInterceptors = (client: AxiosInstance, interceptors: number[]) => {
  const [requestInterceptor, responseInterceptor] = interceptors;

  client.interceptors.request.eject(requestInterceptor);
  client.interceptors.response.eject(responseInterceptor);
};