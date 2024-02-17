const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      require: [true, "description is required"],
    },
    image: {
      type: String,
      require: [true, "image is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "User Id is required"],
    },
  },
  { timestamps: true }
);

const blogModal = mongoose.model("Blogs", blogSchema);

module.exports = blogModal;
