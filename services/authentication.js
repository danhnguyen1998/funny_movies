import { HTTP_METHOD } from "../utils/common";
import { request } from "./request";

export const apiRegister = (body) =>
  request(HTTP_METHOD.POST, "/api/users/create", body);
