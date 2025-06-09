const express = require("express");
const route = express.Router();
const user = require("./userController");
const validate = require("../../validation/validate");
const { userValidation,roleValidation } = require("../../validation/userVal");
const checkRole = require("../../middleware/roleCheck");

route.post("/add", checkRole(["user_add"]), validate(userValidation), user.add);
route.post(
  "/add-user-role",
  checkRole(["user_role_add"]),
  validate(roleValidation),
  user.addUserRole
);
module.exports = route;
