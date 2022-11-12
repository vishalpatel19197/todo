require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

global.response = require("./util/response").response;

app.use(cors());
app.use(express.json());

const indexRoute = require('./api/indexRoute') 
app.use("/api/v1", indexRoute);

const PORT = process.env.port || 4000;

app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});
