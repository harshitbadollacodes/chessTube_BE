const express = require("express");
const { 
    getPlaylist, 
    newPlaylist, 
    addVideosToPlaylist 
} = require("../controller/playlist.controller");

const router = express.Router();

// Get all the playlists
router.route("/").get(getPlaylist);

// Create a new playlist
router.route("/new").post(newPlaylist);

// Add videos to initial playlists
router.route("/:playlistId").post(addVideosToPlaylist)

module.exports = router;