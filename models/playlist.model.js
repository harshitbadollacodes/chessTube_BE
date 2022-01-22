const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: "Cannot add unnamed playlist",
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: "Video",
    }]
}, { timestamps: true });

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = { Playlist };