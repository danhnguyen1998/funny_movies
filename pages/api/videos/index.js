import { apiHandler } from "../../../helpers/api-handler";
import { db } from "../../../helpers/db";

export default apiHandler({
    post: create,
    get: list,
});

async function create(req, res) {
    const Video = db.Video;
    const body = req.body;
    const video = new Video(body);
    await video.save();
    res.json({ video });
}

async function list(req, res) {
    const Video = db.Video;
    const videos = await Video.find().sort({ createdAt: 'desc' })
    res.json({ videos });
}