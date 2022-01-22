const express = require("express");
const { getVideos, getVideoDetails } = require("../controller/videos.controller");
const router = express.Router();
const { videosData } = require("../data/initialData");

// const pushInitialVideosToDB = () => {
//     videosData.forEach(async (videoDetails) => {
//         const video = new Video(videoDetails);
//         const saveVideo = await video.save();
//     })
// };

// pushInitialVideosToDB();

router.route("/").get(getVideos);

router.route("/:videoId").get(getVideoDetails);

module.exports = router;