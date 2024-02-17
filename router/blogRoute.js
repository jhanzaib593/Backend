const express = require("express");
const {
  getAllBlogsController,
  createAllBlogsController,
  updateAllBlogsController,
  getBlogByIdController,
  deleteAllBlogsController,
  userBlogsController,
} = require("../controllers/blogController");

const multer = require("multer");
const upload = multer({});

//router object

const router = express.Router();

//GET || all blogs
router.get("/all-blog", getAllBlogsController);

//PORT || Create blogs
router.post("/create-blog", upload.single("image"), createAllBlogsController);

//PUT || update blogs
router.put("/update-blog/:id", updateAllBlogsController);

//GET || Single blogs Details
router.get("/get-blog/:id", getBlogByIdController);

//DELETE || delete blogs
router.delete("/delete-blog/:id", deleteAllBlogsController);

//GET || User blog
router.get("/user-blog/:id", userBlogsController);

module.exports = router;
