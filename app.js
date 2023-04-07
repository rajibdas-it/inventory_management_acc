const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Server is running");
});

module.exports = app;
