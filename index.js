const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;
const productRoute = require("./routes/product.route");
const colors = require("colors");
const dbConnect = require("./utils/dbConnection");

//middlewares
app.use(express.json());
app.use(cors());

dbConnect();

app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  console.log("Server is running");
});
app.all("*", (req, res) => {
  console.log("no page found with this url");
});
app.listen(port, () => {
  console.log(`server running on port ${port}`.yellow.bold);
});
