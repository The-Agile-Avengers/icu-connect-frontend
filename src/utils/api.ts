import axios from "axios";
import { getDomain } from "./getDomain";

// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
const AuthToken =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NyIsImV4cCI6MTY3OTc1NTc0MSwiaWF0IjoxNjc5NzM3NzQxfQ.mCQ-OUGvJJ9jlraMF8PAILkAmdbJjYBZ5G_l-lUeMo9xrgaKZJGQA3jFNbs5CbFi1upIm2_O-_Yzo85LPgSdXQ";

export const api = axios.create({
  baseURL: getDomain(),
  headers: {
    "Content-Type": "application/json",
    Authorization: AuthToken,
  },
});
