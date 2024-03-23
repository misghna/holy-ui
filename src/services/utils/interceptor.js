import axios from "axios";

const BASE_URL = "https://api.npoint.io/";

const requestInterceptor = () => {
  return axios.interceptors.request.use(
    (config) => {
      config.url = BASE_URL + config.url;
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

const responseInterceptor = () => {
  return axios.interceptors.response.use(
    (response) => {
      console.log("Response test:", response.status, response.data);
      return response;
    },
    (error) => {
      console.error("Error:", error.response.status, error.response.data);

      if (error.response.status === 401) {
        console.error("Unauthorized access");
      } else if (error.response.status >= 500) {
        console.error("Server error");
      } else {
        console.error("Other error");
      }

      return Promise.reject(error);
    }
  );
};

const interceptor = {};
interceptor.initializeInterceptor = () => {
  requestInterceptor();
  responseInterceptor();
};
export default interceptor;
