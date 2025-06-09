const mongoose = require("mongoose");

let role = {
  roleId: {
    type: Number,
  },
  roleName: {
    type: String,
  },
  key: {
    type: String,
  },
  subId: {
    type: Number,
  },
};

const roleSchema = new mongoose.Schema(role);
const roleUserSchema = {
  key: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
};

const roleUserModel = mongoose.model("roleUser", roleUserSchema);
const roleModel = mongoose.model("role", roleSchema);

module.exports = {
  roleModel,
  roleUserModel,
};
