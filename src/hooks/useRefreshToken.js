import { getRefreshToken } from "~/services/utils/interceptor";

const useRefreshToken = () => {
  return getRefreshToken;
};
export default useRefreshToken;
