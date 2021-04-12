const { Blog } = require("../models/blog");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
  const blogList = await Blog.find();
  if (!blogList) {
    res.status(500).json({ success: false });
  }
  res.send(blogList);
});

router.get(`/:id`, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(500).json({ success: false });
  }
  res.send(blog);
});

router.post("/", uploadOptions.single("image"), async (req, res) => {
  const file = req.file;
  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      image: `${basePath}${fileName}`,
    });
    blog = await blog.save();

    if (!blog) return res.status(400).send("the blog cannot be created!");

    res.send(blog);
  } else {
    let blog = new Blog({
      title: req.body.title,
      content: req.body.content,
    });
    blog = await blog.save();

    if (!blog) return res.status(400).send("the blog cannot be created!");

    res.send(blog);
  }
});

router.put("/:id", uploadOptions.single("image"), async (req, res) => {
  const file = req.file;
  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let params = {
      title: req.body.title,
      content: req.body.content,
      image: `${basePath}${fileName}`,
    };
    for (let prop in params) if (!params[prop]) delete params[prop];
    const blog = await Blog.findByIdAndUpdate(req.params.id, params, {
      new: true,
    });

    if (!blog) return res.status(400).send("the blog cannot be created!");

    res.send(blog);
  } else {
    let params = {
      title: req.body.title,
      content: req.body.content,
      image: `${basePath}${fileName}`,
    };
    for (let prop in params) if (!params[prop]) delete params[prop];

    const blog = await Blog.findByIdAndUpdate(req.params.id, params, {
      new: true,
    });

    if (!blog) return res.status(400).send("the blog cannot be created!");

    res.send(blog);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).send();
    }
    res.send("Blog succesfully deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
