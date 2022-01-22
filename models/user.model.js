const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String, 
        trim: true,
        required: "Please enter a name"
    }, 
    lastName: {
        type: String, 
        trim: true,
        required: "Please enter your last name"
    },
    email: {
        type: String,
        trim: true,
        required: "Please enter your email",
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: "Please enter password"
    }

}, { timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = { User };