const cloudinary = require("cloudinary").v2;
const multer = require("multer");

//created cloudinary config
cloudinary.config({
  cloud_name: "dt9axyakb",
  api_key: "989325189684268",
  api_secret: "X8S1PPcr1gAq2YkGYDky3dZsAc0",
});

//created storage using multer
const storage = new multer.memoryStorage();

// async function that returns a result

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
