require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.port || 4000;

app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});
