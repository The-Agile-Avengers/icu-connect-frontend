import axios, { AxiosError, AxiosResponse } from "axios";
import { getDomain } from "./getDomain";
import { getJwtToken, isLoggedIn, logout } from "./utils";

const headers = {
  "Content-Type": "application/json",
  ...(isLoggedIn() && { Authorization: `Bearer ${getJwtToken()}` }),
};

const api = axios.create({
  baseURL: getDomain(),
  headers: headers,
});

api.interceptors.response.use(
  (response: AxiosResponse) =>
    // If the response is successful, return it as is.
    response,
  (error: AxiosError) => {
    // If the response is unauthorized (status 401), redirect to the login page.
    if (error.response && error.response.status === 401) {
      logout();
    }
    // If it's another error, throw it so it can be handled by the calling code.
    return Promise.reject(error);
  }
);

export { api };
