const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const dbConnect = require("./utils/dbConnection");
const port = process.env.PORT || 8080;

dbConnect();

app.listen(port, () => {
  console.log(`server running on port ${port}`.yellow.bold);
});
