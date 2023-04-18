import { HTTP_METHOD } from "../utils/common";
import { request } from "./request";

export const apiGetRoles = (body) =>
  request(HTTP_METHOD.POST, "/api/login", body);
