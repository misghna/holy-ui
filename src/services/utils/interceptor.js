import axios from "axios";

const requestInterceptor = (config) => {
  config.url = config.baseURL + config.url;
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const resquestErrorInterceptor = (error) => Promise.reject(error);

const responseInterceptor = (response) => {
  console.log("Response :", response?.status, response?.data);
  return response;
};
const responseErrorInterceptor = (error) => {
  if (error.response) {
    console.error("Error:", error.response.status, error.response.data);

    if (error.response.status === 401) {
      console.error("Unauthorized access");
    } else if (error.response.status === 400) {
      console.error("bad request");
    } else if (error.response.status === 403) {
      console.error("not authorize / refresh token");
    } else if (error.response.status >= 500) {
      console.error("Server error");
    } else {
      console.error("Other error");
    }
  } else if (error.request) {
    console.log("error  ", error.request);
  } else {
    console.log("error ", error.message);
  }

  return Promise.reject(error);
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

axiosInstance.interceptors.request.use(requestInterceptor, resquestErrorInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default axiosInstance;
