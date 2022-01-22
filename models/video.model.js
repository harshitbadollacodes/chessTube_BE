const mongoose = require("mongoose");
const { Schema } = mongoose;

const VideoSchema = new Schema({
    url: {
        type: String,
        required: "Please enter the URL"
    }, 
    title: {
        type: String,
        required: "Please enter the title of the video"
    },
    thumbnail: {
        type: String,
        required: "Please enter the url of thumbnail",
    },
    description: {
        type: String,
        required: "Please enter description",
    },
    channel: {
        name: {
            type: String,
            required: "please enter channel name",
        },
        logo: {
            type: String,
            required: "Please enter the url of channel logo"
        }
    },
    statistics: {
        subscribers: {
            type: String,
            required: "Please enter subscriber count"
        },
        views: {
            type: String,
            requied: "Please enter video views"
        }
    }
}, { timestamps: true });

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };