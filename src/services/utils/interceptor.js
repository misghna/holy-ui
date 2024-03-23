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
      console.log("Response :", response?.status, response?.data);
      return response;
    },
    (error) => {
      if (error.response) {
        console.error("Error:", error.response.status, error.response.data);

        if (error.response.status === 401) {
          console.error("Unauthorized access");
        } else if (error.response.status === 400) {
          console.error("bad request");
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
    }
  );
};

const interceptor = {};
interceptor.initializeInterceptor = () => {
  requestInterceptor();
  responseInterceptor();
};
export default interceptor;
