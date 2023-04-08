const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log("Database connection is successfull".red.bold);
  });
};

module.exports = dbConnect;
