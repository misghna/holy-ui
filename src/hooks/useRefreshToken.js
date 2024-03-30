import axios from "axios";

import { useAuth } from "~/context/AuthContext";

const useRefreshToken = () => {
  const { authState, setAuthState } = useAuth();

  const refresh = async () => {
    return axios
      .get(`/auth/token/refresh`, {
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${authState.token?.refresh}`
        }
      })
      .then(({ data }) => {
        setAuthState((prev) => {
          return {
            ...prev,
            accessToken: data.data.access_token
          };
        });
        const local = JSON.parse(localStorage.getItem("auth"));
        local.accessToken = data.data.access_token;
        localStorage.setItem("auth", JSON.stringify(local));
        return data.data.access_token;
      })
      .catch((err) => {
        console.log("Refresh err", err);
      });
  };
  return refresh;
};

export default useRefreshToken;
