const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");

router.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      if (products) {
        res.status(200).json(products);
      } else {
        res.status(400).json({
          success: true,
          message: "Not found !",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({
          success: true,
          message: "No product present with the given ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      images: req.body.images,
      originalPrice: req.body.originalPrice,
      discountedPrice: req.body.discountedPrice,
      isFeatured: req.body.isFeatured,
      colours: req.body.colours,
      category: req.body.category,
    },
    { new: true }
  )
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({
          success: true,
          message: "Product could not be editted !",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
});

router.post("/", (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    images: req.body.images,
    originalPrice: req.body.originalPrice,
    discountedPrice: req.body.discountedPrice,
    isFeatured: req.body.isFeatured,
    colours: req.body.colours,
    category: req.body.category,
  });

  newProduct
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((deletedProduct) => {
      if (deletedProduct) {
        res.status(200).json({
          success: true,
          message: "Product is deleted successfully !",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not found !",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: err,
      });
    });
});

module.exports = router;
