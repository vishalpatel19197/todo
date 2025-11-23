const mongoose = require("mongoose");
let connectionUrl = "mongodb://localhost:27017/todo";
let connectionLog = "DB connect with local";
if (process.env.db_username && process.env.db_password) {
  connectionUrl = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.1azxacj.mongodb.net/todo`;
  connectionLog = "DB connect with cluster";
}

mongoose.connect(connectionUrl, {}, (err) => {
  if (err) {
    console.log("connection error...", err);
  } else {
    console.log(connectionLog);
  }
});
