const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
