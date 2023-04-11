const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;
const productRoute = require("./routes/product.route");
const colors = require("colors");
const dbConnect = require("./utils/dbConnection");
const brandRouter = require("./routes/brand.route");
const storeRouter = require("./routes/store.route");
const categoryRouter = require("./routes/category.route");
const supplierRouter = require("./routes/supplier.route");
const stockRouter = require("./routes/stock.route");
const userRouter = require("./routes/user.route");

//middlewares
app.use(express.json());
app.use(cors());

//connect database from utils
dbConnect();

//define api route
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/stock", stockRouter);
app.use("/api/v1/", userRouter);

//universal route
app.get("/", (req, res) => {
  console.log("Server is running");
});
app.all("*", (req, res, next) => {
  res.send("no url found with this");
  next();
});
app.listen(port, () => {
  console.log(`server running on port ${port}`.yellow.bold);
});
