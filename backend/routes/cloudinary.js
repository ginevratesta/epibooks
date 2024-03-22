const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer-storage');
const cloudController = require('../controller/cloudinaryController');

router.post("/uploadFile", upload.single('image'), cloudController.postCloudinary);

module.exports = router;

