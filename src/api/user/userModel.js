const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  type: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  role: {
    type: [String],
    default: [],
  },
  password: {
    type: String,
  },
},{
  timestamps: true
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
