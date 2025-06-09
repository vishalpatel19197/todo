const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todo", {}, (err) => {
  if (err) {
    console.log("connection error...");
  } else {
    console.log("connection successfully.");
  }
});
