import axios from "axios";
import { getDomain } from "./getDomain";

// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
const AuthToken =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NyIsImV4cCI6MTY3OTc3NTM1MSwiaWF0IjoxNjc5NzU3MzUxfQ.e_cR0zcwWxEZVfpTckmXqBM597SZfu1-6NH80uuxTM2M_iXeRnhOnQfGiTWyqXUofkXnJWbP6eoOhyVdzgIrDw";

export const api = axios.create({
  baseURL: getDomain(),
  headers: {
    "Content-Type": "application/json",
    Authorization: AuthToken,
  },
});
