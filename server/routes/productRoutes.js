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

/* UPDATE PRODUCT */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;

    if (req.file) {
      product.image = req.file.filename;
    }

    await product.save();

    res.json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* DELETE PRODUCT */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
