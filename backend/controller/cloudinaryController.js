const cloudinary = require("../utils/cloudinary");

exports.postCloudinary = (req, res) => {
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error uploading file",
      });
    }

    res.status(200).json({
      success: true,
      message: "File correctly uploaded",
      data: result,
    });
  });
};
