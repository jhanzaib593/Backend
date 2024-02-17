const express = require("express");
const {
  getAllUser,
  registerController,
  loginController,
} = require("../controllers/userControllers");
const multer = require("multer");
const upload = multer({});

const router = express.Router();

//Create User || POST
router.post("/register", upload.single("userimage"), registerController);

// get all user || GET
router.get("/all-user", getAllUser);

//Login || POST

router.post("/login", loginController);

module.exports = router;
