const express = require("express");
const Product = require("../models/Product");
const upload = require("../config/multer");

const router = express.Router();

/* ADD PRODUCT */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, quantity , price } = req.body;

    const product = new Product({
      name,
      quantity,
      price,
      image: req.file ? req.file.filename : null
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* GET PRODUCT LIST */
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

module.exports = router;
