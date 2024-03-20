const express = require("express");
const router = express.Router();
const blogsController = require("../controller/blogController");

router.get("/getblogs", blogsController.getBlogs );

router.post("/createBlog", blogsController.postBlog);


router.get("/getBlog/:id", blogsController.getBlogById);

router.patch("/updateBlog/:id", blogsController.patchBlog);


router.delete("/deleteBlog/:id", blogsController.deleteBlog);




module.exports = router;