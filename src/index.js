require("dotenv").config();

const express = require("express");
const cors = require("cors");
const coockieParser = require("cookie-parser");
const serverless = require('serverless-http');
require("../src/api/role/role");
const app = express();

//db
require("./db/db");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, authToken"
  );
  next();
}
);


// Rate limiter middleware
const { rateLimiter } = require("./middleware/rateLimit");
app.use(rateLimiter);

app.use(cors());
app.use(express.json());
app.use(coockieParser());

const indexRoute = require("./api/indexRoute");
app.use("/api/v1", indexRoute);

const PORT = process.env.port || 4000;

module.exports.handler = serverless(app);
app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});
