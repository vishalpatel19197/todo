require("dotenv").config();

const express = require("express");
const cors = require("cors");
const coockieParser = require("cookie-parser");
const app = express();

//db
const db = require("./db/db");

const handler = require("./util/response");

// Rate limiter middleware
const { rateLimiter } = require("./middleware/rateLimit");
app.use(rateLimiter);

// global handler
global.response = handler.response;
global.errorHandler = handler.errorHandler;

app.use(cors());
app.use(express.json());
app.use(coockieParser());

const indexRoute = require("./api/indexRoute");
app.use("/api/v1", indexRoute);

const PORT = process.env.port || 4000;

app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});
