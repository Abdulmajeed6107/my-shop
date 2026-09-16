import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; // adjust path as needed

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "my-shop", // all uploads go into this folder on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp", "heic", "heif"],
  },
});

// Only allow image files
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg, png, webp images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;