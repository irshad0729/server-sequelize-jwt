const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../Controllers/blogController");

const userAuth = require("../Middlewares/userAuth");

const router = express.Router();

// Create a new blog post
router.post("/", createBlog);

// Get a list of all blogs
router.get("/", getAllBlogs);

// Get a specific blog by ID
router.get("/:id", getBlogById);

// Update a specific blog by ID (using PUT or PATCH)
router.put("/:id", updateBlogById);

// Delete a specific blog by ID
router.delete("/:id", deleteBlogById);

module.exports = router;
