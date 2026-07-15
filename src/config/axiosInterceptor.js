import { apiClient } from "@/config";
import { login, logout } from "@/redux";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, accessToken = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(accessToken);
    }
  });

  failedQueue = [];
};

export const axiosRequestInterceptor = (store) => {
  apiClient.interceptors.request.use(
    (config) => {
      console.log(config);

      const excludedUrls = ["/auth/login", "/auth/register", "/auth/refresh","/auth/logout",];

      const isExcluded = excludedUrls.some((url) =>
        config.url?.startsWith(url),
      );
      if (isExcluded) {
        return config;
      }
      const { accessToken } = store.getState().auth;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      console.log(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export const axiosResponseInterceptor = (store) => {
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const ogReq = error.config;
      if (error.response?.status !== 401 || ogReq._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((accessToken) => {
            ogReq.headers = ogReq.headers || {};
            ogReq.headers.Authorization = `Bearer ${accessToken}`;

            return apiClient(ogReq);
          })
          .catch((err) => Promise.reject(err));
      }

      ogReq._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post("/auth/refresh");
        const { accessToken, user } = response.data;
        store.dispatch(
          login({
            accessToken,
            user,
          }),
        );
        processQueue(null, accessToken);
        ogReq.headers = ogReq.headers || {};
        ogReq.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(ogReq);
      } 
      catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
};
