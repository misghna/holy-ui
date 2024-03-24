import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

const axiosRequestInterceptor = (latestAccessToken) => {
  return axiosPrivate.interceptors.request.use(
    (config) => {
      let accessToken = latestAccessToken;
      if (!accessToken) {
        const parseAuth = JSON.parse(localStorage.getItem("auth") || null);
        accessToken = parseAuth?.tokens.access_token;
      }
      if (accessToken) {
        config.headers.Authorization = ` Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
axiosRequestInterceptor();

export const getRefreshToken = async () => {
  const parseAuth = JSON.parse(localStorage.getItem("auth"));
  const refreshToken = parseAuth.tokens?.refresh_token;
  try {
    if (refreshToken) {
      const response = await axios.get(import.meta.env.VITE_BASE_URL + "refresh", {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      });
      const tokens = response.data;
      parseAuth.tokens.access_token = tokens.data.access_token;
      localStorage.setItem("auth", JSON.data.access_token);
      axiosRequestInterceptor(tokens.data.access_token);
      return tokens.data.access_token;
    }
  } catch (error) {
    console.log("failed to refresh token ", error);
  }
  return "";
};

const refreshToken = async (error) => {
  const isTokenRefreshed = await getRefreshToken();
  if (isTokenRefreshed && error.config) {
    error.config.headers.Authorization = `Bearer ${isTokenRefreshed}`;
    return await axios.request(error.config);
  } else {
    console.log("message: session time out!");
  }
};

const axiosResponseInterceptor = () => {
  return axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        console.error("Error:", error.response.status, error.response.data);

        if (error.response.status === 401) {
          await refreshToken(error);
        } else if (error.response.status === 400) {
          console.error("bad request");
        } else if (error.response.status === 403) {
          console.error("not authorize");
        } else if (error.response.status >= 500) {
          console.error("Server error");
        } else {
          console.error("Other error");
        }
      } else if (error.request) {
        console.error("error  ", error.request);
      } else {
        console.error("error ", error.message);
      }

      return Promise.reject(error);
    }
  );
};

axiosResponseInterceptor();
