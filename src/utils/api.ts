import axios from "axios";
import { getDomain } from "./getDomain";
import { getJwtToken, isLoggedIn } from "./utils";

const headers = {
  "Content-Type": "application/json",
  ...(isLoggedIn() && { Authorization: `Bearer ${getJwtToken()}` }),
};

export const api = axios.create({
  baseURL: getDomain(),
  headers: headers,
});
