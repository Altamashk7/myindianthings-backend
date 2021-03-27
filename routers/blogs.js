const { Blog } = require("../models/blog");
const express = require("express");
const router = express.Router();

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

router.post("/", async (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    content: req.body.content,
  });
  blog = await blog.save();

  if (!blog) return res.status(400).send("the blog cannot be created!");

  res.send(blog);
});

router.put("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true }
  );

  if (!blog) return res.status(400).send("the blog cannot be created!");

  res.send(blog);
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
