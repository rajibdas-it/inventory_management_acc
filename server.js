const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const port = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("Database connection is successfull".red.bold);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`.yellow.bold);
});
