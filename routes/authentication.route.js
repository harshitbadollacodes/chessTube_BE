const { User } = require("../models/user.model");
const { Playlist } = require("../models/playlist.model");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const router = express.Router();
dotenv.config();

let initialPlaylists = [
    { name: "Liked Videos" }, 
    { name: "Watch Later Videos" }
];

router.route("/login")
.post(async (req, res) => {
    try {
        const secret = process.env.JWT_SECRET;
        const { email, password } = req.body;

        const findUser = await User.findOne({ email });

        if (findUser === null) {
            return res.status(401).json({
                success: false,
                message: "Looks like you haven't signed up. Sign up now!"
            });
        };

        let matchPassword = await bcrypt.compare(password, findUser.password);
        console.log(matchPassword);

        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                    message: "Password is incorrect"
            })
        }

        const token = jwt.sign({ userId: findUser._id }, secret, { expiresIn: "24h" });

        return res.json({ success: true, message: "Auth success", userId: findUser._id, token })
    } catch(error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Auth failed", errorMessage: error.message })
    }
});

router.route("/signup")
.post(async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        console.log(firstName, lastName, email, password );

        const findUser = await User.findOne({ email });

        if (findUser !== null) {
            return res.status(409).json({
                success: false,
                message: "Email already exists. Please login"
            })
        }

        const saltRounds = 10;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        const saveNewUser = await newUser.save();

        const secret = process.env.JWT_SECRET;

        const token = jwt.sign({ userId: saveNewUser._id }, secret, { expiresIn: "24h" });

        initialPlaylists.forEach(async (playlist) => {
            console.log(playlist);
            const newPlaylist = new Playlist({
                owner: saveNewUser._id,
                name: playlist.name,
                videos: []
            });

            const saveNewPlaylist = await newPlaylist.save();
        })

        res.json({
            success: true,
            userId: saveNewUser._id,
            message: "Sign up successful",
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Cannot create user",
            errMessage: error.message
        });
    }
});

module.exports = router;