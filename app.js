const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json({ message: "Product deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("database connected successfully");
    app.listen(PORT, () => {
      console.log(`port is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed");
  });
