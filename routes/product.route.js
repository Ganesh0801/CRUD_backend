const express = require("express");
const {
  getAllProduct,
  createNewProduct,
  getProductById,
  updateProductById,
  deleteProduct,
} = require("../controller/product.controller.js");
const router = express.Router();

router.get("/", getAllProduct);

router.post("/", createNewProduct);

router.get("/:id", getProductById);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProduct);

module.exports = router;
