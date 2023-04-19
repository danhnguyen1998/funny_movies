import { HTTP_METHOD } from "../utils/common";
import { request } from "./request";

export const apiCreateVideo = (body) =>
  request(HTTP_METHOD.POST, "/api/videos", body);

  export const apiListVideos = () =>
  request(HTTP_METHOD.GET, "/api/videos");
