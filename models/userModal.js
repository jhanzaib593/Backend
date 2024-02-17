const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "username is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: { type: String, required: [true, "password is required"] },
    userimage: {
      type: String,
      require: [true, "image is required"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blogs",
      },
    ],
  },
  { timestamps: true }
);

const userModal = mongoose.model("User", userSchema);

module.exports = userModal;
