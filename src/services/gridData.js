import axios from "axios";

import interceptor from "./utils/interceptor";

interceptor.initializeInterceptor();

export const getGridData = async (url) => {
  try {
    const response = await axios.get(url);

    return response?.data || [];
  } catch (error) {
    console.log("error ", error.message);
  }
};
