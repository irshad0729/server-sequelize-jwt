const db = require("../Model");

// Assigning the Blog model to the variable Blog
const Blog = db.blogs;

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { blogName, blogDescription, userId } = req.body;

    console.log(req.body);

    const data = {
      blogName,
      blogDescription,
      userId, // Assuming you have the user ID of the creator
    };

    const blog = await Blog.create(data);

    if (blog) {
      return res.status(201).send(blog);
    } else {
      return res.status(409).send("Blog creation failed");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Get a list of all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    return res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    return res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Update a blog by ID
const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { blogName, blogDescription } = req.body;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    blog.blogName = blogName;
    blog.blogDescription = blogDescription;
    await blog.save();

    return res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Delete a blog by ID
const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    await blog.destroy();

    return res.status(204).send(`blog id=${id} has been deleted`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
