require("dotenv").config();

const express = require("express");
const cors = require("cors");
const coockieParser = require("cookie-parser");
require("../src/api/role/role");
const app = express();
const handler = require("./handlers/errorHandler");

const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 10 || (major === 10 && minor <= 0)) {
  console.log(
    "Please go to nodejs.org and download version 10 or greater. 👌\n "
  );
  process.exit();
}

//db
require("./db/db");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, authToken"
  );
  next();
});

// Rate limiter middleware
const { rateLimiter } = require("./middleware/rateLimit");
app.use(rateLimiter);

app.use(cors());
app.use(express.json());
app.use(coockieParser());

const indexRoute = require("./api/indexRoute");
app.use("/api/v1", indexRoute);

app.use(handler.noFound);

const PORT = process.env.port || 4000;

app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});

module.exports = app