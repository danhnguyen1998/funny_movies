import axios from "axios";
import { useVideoInfo } from "./useVideoInfo";

describe("useVideoInfo", () => {
  it("returns video information from YouTube API", async () => {
    const embedId = "abcdefg123456";
    const mockResponse = {
      data: {
        id: embedId,
        snippet: {
          title: "Test Video",
          description: "This is a test video."
        }
      }
    };
    jest.spyOn(axios, "get").mockResolvedValueOnce(mockResponse);
    const videoInfo = await useVideoInfo(embedId);
    expect(videoInfo).toEqual(mockResponse);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${embedId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`);
  });
});
