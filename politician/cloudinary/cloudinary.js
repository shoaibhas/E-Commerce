import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { resolve } from "path";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'admin',
    format: async (req, file) => file.originalname.split(".").pop(),
    public_id: (req, file) => `${file.fieldname}_${Date.now()}${file.originalname}`,
    // console.log();
  },
});
// console.log(storage.params.folder.req);
const upload = multer({ storage: storage });
export default upload;
