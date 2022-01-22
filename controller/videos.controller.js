const { Video } = require("../models/video.model");

const getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch(error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const getVideoDetails = async (req, res) => {
    try {
        const { videoId } = req.params;
        console.log(typeof videoId);
        const video = await Video.findById(videoId)

        res.json({ success: true, video });

    } catch(error) {
        console.log(error);
    }
}

module.exports = { 
    getVideos,
    getVideoDetails
}