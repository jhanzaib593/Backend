const mongoose = require("mongoose");
const blogModal = require("../models/blogModal");
const userModal = require("../models/userModal");
const { uploadImage } = require("../config/storageImg");

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModal.find({}).populate("user");

    if (blogs.length === 0) {
      return res.status(200).send({
        message: "No Blogs Found",
        success: false,
      });
    }

    // Check if the user field exists and is not null before accessing its properties
    const populatedBlogs = blogs.map((blog) => {
      if (blog.user && blog.user.username) {
        return {
          ...blog._doc,
          user: {
            _id: blog.user._id,
            username: blog.user.username,
            // Add other user properties if needed
          },
        };
      } else {
        return blog;
      }
    });

    return res.status(200).send({
      message: "All Blogs Lists",
      success: true,
      BlogsCount: blogs.length,
      blogs: populatedBlogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while Getting Blogs",
      success: false,
      error,
    });
  }
};

//Create BLOGS

exports.createAllBlogsController = async (req, res) => {
  try {
    // Destructure the relevant fields from the request body
    const { title, description, user } = req.body;

    // Check if required fields are provided
    if (!title || !description || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // Validate that the user is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Check if the user exists
    const existingUser = await userModal.findById(user);

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    // Upload image (assuming you have a function named uploadImage)
    const imageData = await uploadImage(req.file);
    const image = imageData.url;

    // Create a new blog with the provided data
    const newBlog = new blogModal({ title, description, image, user });

    // Start a MongoDB session for transaction support
    const session = await mongoose.startSession();
    session.startTransaction();

    // Save the new blog within the session
    await newBlog.save({ session });

    // Add the new blog to the user's blogs array
    existingUser.blogs.push(newBlog);

    // Save the updated user within the session
    await existingUser.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    // Send a success response
    return res.status(201).send({
      success: true,
      message: "Blog Created",
      newBlog,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    return res.status(400).send({
      message: "Error while Creating Blog",
      success: false,
      error,
    });
  }
};

//update BLOGS

exports.updateAllBlogsController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    // Validate input data
    if (!title || !description || !image) {
      return res.status(400).send({
        success: false,
        message: "Title, description, image, and user are required fields.",
      });
    }

    // Update the blog entry
    const updatedBlog = await blogModal.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );

    // Check if the blog entry was found and updated
    if (!updatedBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found.",
      });
    }

    // Check if the 'user' object associated with the blog is not null
    if (updatedBlog.user) {
      console.log("User exists:", updatedBlog.user);
      if (updatedBlog.user.username) {
        console.log("Username:", updatedBlog.user.username);
      } else {
        console.log("Username is null");
      }
    } else {
      console.log("User is null");
    }

    // Send a success response with the updated blog entry
    return res.status(200).send({
      success: true,
      message: "Blog updated successfully.",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating the blog.",
      error: error.message,
    });
  }
};

//single BLOGS
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlog = await blogModal.findById(id);
    if (!userBlog) {
      return res.status(404).send({
        message: "blog not found with this is",
        success: false,
      });
    }
    return res.status(200).send({
      message: "fatch single blog",
      success: true,
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error white single Blogs",
      success: false,
      error,
    });
  }
};

//Delete BLOGS
// exports.deleteAllBlogsController = async (req, res) => {
//   try {
//     const blog = await blogModal
//       .findByIdAndDelete(req.params.id)
//       .populate("user");
//     await blog.user.blogs.pull(blog);
//     await blog.user.save();
//     return res.status(200).send({
//       success: true,
//       message: "Bloge Delete",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       message: "Error white Detele Blogs",
//       success: false,
//       error,
//     });
//   }
// };

exports.deleteAllBlogsController = async (req, res) => {
  try {
    // Find and delete the blog with the specified ID
    // const blog = await blogModal.findByIdAndDelete(req.params.id);

    const blog = await blogModal
      .findByIdAndDelete(req.params.id)
      .populate("user");

    // Check if the blog exists
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if the user property exists before proceeding
    if (blog.user) {
      // Remove the deleted blog from the user's blogs array
      blog.user.blogs.pull(blog);

      // Save the user to persist the changes in the user's blogs array
      await blog.user.save();
    }

    // Send a success response
    return res.status(200).send({
      success: true,
      message: "Blog Deleted",
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};

//GEt user BLOGS
exports.userBlogsController = async (req, res) => {
  try {
    const userBlog = await userModal.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with is id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error in user Blogs",
      success: false,
      error,
    });
  }
};
