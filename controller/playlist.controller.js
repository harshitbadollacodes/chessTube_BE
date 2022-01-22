const { Playlist } = require("../models/playlist.model");

const getPlaylist = async (req, res) => {
    try {
        const { userId } = req;

        const playlist = await Playlist.find({ owner: userId }).populate("videos");

        return res.json({
            success: true,
            playlist
        })

    } catch(error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Unable to fetch playlist"})
    }
};

const newPlaylist = async (req, res) => {
    try {
        const { userId } = req;
        const { name, videoId } = req.body;

        const newPlaylist = new Playlist({
            owner: userId,
            name,
            videos: videoId
        });

        const savePlaylist = await newPlaylist.save();

        const playlists = await Playlist.find({ owner: userId }).populate("videos");

        res.json({ success: true, playlists })

    } catch(error) {
        console.log(error);
    }
};

const addVideosToPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { videoId } = req.body;

        const playlist = await Playlist.findOne({ _id: playlistId });

        const isVideoInPlaylist = playlist.videos.includes(videoId);

        isVideoInPlaylist ? playlist.videos.pull(videoId) : playlist.videos.push(videoId)

        await playlist.save();

        res.json({ success: true });

    } catch(error) {
        console.log(error);
    }
}

module.exports = { 
    getPlaylist,
    newPlaylist,
    addVideosToPlaylist
}

