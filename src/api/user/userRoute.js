const express = require("express");
const route = express.Router();
const user = require("./userController");

route.post("/add", user.add);

module.exports = route;
