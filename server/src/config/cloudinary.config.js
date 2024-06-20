import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configuration
cloudinary.config({
  cloud_name: 'djtiultrg',
  api_key:  '195985952364965',
  api_secret:  'dESth8bnkxcJmOmyS2UU0d3qEmA'
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "digital",
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;