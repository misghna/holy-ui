import axios from "axios";

import { useAuth } from "~/contexts/AuthContext";

import config from "../constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;
const useUser = () => {
  const { setAuthState } = useAuth();

  const login = async ({ email, password }) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await axios.post(`/api/${currentConfig.login}`, formData);
    const authData = response.data;

    const data = {
      token: {
        refresh: authData.access_token,
        accessToken: authData.refresh_token
      },
      user: {
        name: "",
        email
      }
    };
    localStorage.setItem("auth", JSON.stringify(data));
    setAuthState(data);
  };

  return { login };
};

export default useUser;
