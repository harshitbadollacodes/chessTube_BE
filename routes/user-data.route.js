const express = require("express");
const { getUserData } = require("../controller/user-data.controller");
const router = express.Router();

router.route("/").get(getUserData);

module.exports = router;