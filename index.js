const cors = require("cors");
const express = require("express");
const port = 5000;

const { verifyToken } = require("./middleware/check-auth-middleware");
const { routeNotFound } = require("./middleware/route-not-found-middleware");
const { errorHandler } = require("./middleware/error-handler-middleware");
const videos = require("./routes/videos.route");
const playlist = require("./routes/playlist.route");
const user = require("./routes/authentication.route");
const userData = require("./routes/user-data.route");
const { initializeDbConnection } = require("./data/db.connect");

const app = express();
app.use(express.json());

app.use(cors());

initializeDbConnection();

app.get("/", (req, res) => {
    res.send({"message": "Hello World! I am from heroku"});
});

app.use("/user", user);
app.use("/videos", videos);
app.use("/userData", verifyToken, userData);
app.use("/playlist", verifyToken, playlist);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(process.env.PORT || port, () => {
    console.log('server started');
});