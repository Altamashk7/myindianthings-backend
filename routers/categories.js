const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

router.get("/", (req, res) => {
  Category.find()
    .then((categories) => {
      if (categories) {
        res.status(200).json(categories);
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
  Category.findById(req.params.id)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(400).json({
          success: true,
          message: "No category present with the given ID",
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
  Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
    },
    { new: true }
  )
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(400).json({
          success: true,
          message: "Category could not be editted !",
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
  const newCategory = new Category({
    name: req.body.name,
    image: req.body.image,
  });

  newCategory
    .save()
    .then((createdCategory) => {
      res.status(201).json(createdCategory);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((deletedCategory) => {
      if (deletedCategory) {
        res.status(200).json({
          success: true,
          message: "Category is deleted successfully !",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Category not found !",
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
