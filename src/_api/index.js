import axios from "axios";

const refresh = async () => {
  const local = JSON.parse(localStorage.getItem("auth"));
  return axios
    .post(
      `/api/refresh-token`,
      { refresh_token: local.token.refresh },
      {
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${local.token?.access}`
        }
      }
    )
    .then(({ data }) => {
      local.accessToken = data.data.access_token;
      localStorage.setItem("auth", JSON.stringify(local));
      return data.data.access_token;
    })
    .catch((err) => {
      console.log("Refresh err", err);
      localStorage.removeItem("auth");
      window.location.href = "/login";
    });
};
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

if (axiosPrivate.interceptors.request.handlers.length === 0) {
  axiosPrivate.interceptors.request.use(
    (config) => {
      const local = JSON.parse(localStorage.getItem("auth") ?? "{}");
      const personalSetting = JSON.parse(localStorage.getItem("personalSetting") ?? "{}");

      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${local?.token?.accessToken}`;
      }
      if (!config.headers.tenant_id && personalSetting?.selectedTenant) {
        config.headers.tenant_id = `${personalSetting?.selectedTenant}`;
      }
      if (!config.headers.language && personalSetting?.language) {
        config.headers.language = `${personalSetting?.language}`;
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
