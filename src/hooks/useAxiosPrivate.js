import axios from "axios";

import useRefreshToken from "~/hooks/useRefreshToken";

const axiosPrivate = axios.create();
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  if (axiosPrivate.interceptors.request.handlers.length === 0) {
    axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("auth"))?.accessToken}`;
        }
        return config;
      },
      (error) => {
        console.groupCollapsed("%cAxiosResponse", "color: red");
        console.groupCollapsed("Error");
        console.error(error);
        console.groupEnd();
        console.group("ErrorObject");
        console.log({ ...error });
        console.groupEnd();
        console.groupEnd();
        return Promise.reject(error);
      }
    );

    axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        console.groupCollapsed("%cAxiosResponse", "color: red");
        console.groupCollapsed("Error");
        console.error(error);
        console.groupEnd();
        console.group("ErrorObject");
        console.log({ ...error });
        console.groupEnd();
        console.groupEnd();
        return Promise.reject(error);
      }
    );
  }
  return axiosPrivate;
};

export default useAxiosPrivate;
