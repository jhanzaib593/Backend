const { uploadImage } = require("../config/storageImg");
const userModal = require("../models/userModal");
const bcrypt = require("bcrypt");

//create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password, userimage } = req.body;
    console.log("req.body user", req.body);
    // Basic input validation
    if (!username || !email || !password || !userimage) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    // Additional email format validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!emailRegex.test(email)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide a valid email address.",
    //   });
    // }

    // const imageData = await uploadImage(req.file);
    // const userimage = imageData.url;

    // Validate file upload
    // if (!req.file) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide an image.",
    //   });
    // }

    // Check if user with email already exists
    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const user = new userModal({
      username,
      email,
      password: hashedPassword,
      userimage,
    });
    await user.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "New user created successfully.",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        userimage: user.userimage,
      },
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};

//get all user
exports.getAllUser = async (req, res) => {
  try {
    const users = await userModal.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "In All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In All Users",
      success: false,
      error,
    });
  }
};

//Login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        message: "Please provide email or password",
        success: false,
      });
    }
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "email is not registerd",
        success: false,
      });
    }

    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid usernaem or password",
      });
    }
    return res.status(200).send({
      message: "Login Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Login Callcback",
      success: false,
      error,
    });
  }
};
