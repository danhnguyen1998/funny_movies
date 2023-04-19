import axios from "axios";

export const useVideoInfo = async (embedId) => {
    const videoInfo = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${embedId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`);

    return videoInfo
};
