import { compare, hash } from "bcrypt";
import adminModel from "../../model/admin/admin.js";
import Jwt from "jsonwebtoken";
import eventsModel from "../../model/events/events.js";
import newsModel from "../../model/news/news.js";
import newsCommentsModel from "../../model/news/newsCommentModel.js";
import socialActivityModel from "../../model/socialActivity/socialActivity.js";
import socialActivityCommentModel from "../../model/socialActivity/socialActivityCommentModel.js";
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
const AdminLoginController = {
  register: async (req, res) => {
    try {
      const { name, cnic, email, password, phoneNo, address } = req.body;
      const { path } = req.file;

      const userAdmin = await adminModel.findOne({
        where: { email },
      });
      if (userAdmin) {
        return res
          .status(400)
          .json({ message: `this email ${email} is already exist...` });
      }
     
      const hashPassword = await hash(password, 10);
     const newAdmin= await adminModel.create({
        name,
        email,
        password: hashPassword,
        cnic,
        phoneNo,
        address,
        picture:path
      });
      if (!newAdmin) {
        return res.status(500).json({ message: 'Error registering admin in the database.' });
      }
  
      // If database registration is successful, upload the image to Cloudinary
      let pictureUrl = null;
      try {
        const result = await cloudinary.uploader.upload(path, {
          folder: 'admin',
          format: 'png', // Change this to your preferred format
        });
        pictureUrl = result.secure_url;
      } catch (cloudinaryError) {
        // Handle Cloudinary upload error
        console.error('Cloudinary upload error:', cloudinaryError);
        // You may choose to respond with an error or ignore the Cloudinary upload failure
      }
      res.status(200).json({ message: `Admin Registered=========>${name}` });
      // console.log(res);
    } catch (error) {
      // console.log(error);
      return res.json({ message: `some bad happened`, error });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userAdmin = await adminModel.findOne({ where: { email } });
      if (!userAdmin) {
        return res.status(401).json({ message: `Invalid Email=====>${email}` });
      }
      const comparePassword = await compare(password, userAdmin.password);
      // console.log(comparePassword);
      if (!comparePassword) {
        return res
          .status(401)
          .json({ message: `Invalid Password=====>${password}` });
      }

      //json web token implement
      const dataAdmin = {
        id: userAdmin.id,
        email: userAdmin.email,
      };
      const token = Jwt.sign(dataAdmin, process.env.JSON_SECRET, {
        expiresIn: "1h",
      });
      req.session.token = token;
      req.session.userAdmin = userAdmin;
      req.session.save();

      return res
        .status(200)
        .json({ message: `${email} Login Successful`, token, dataAdmin });
    } catch (error) {
      console.log({ message: `some bad happened`, error });
    }
  },
  getall: async (req, res) => {
    try {
      const a = await adminModel.findAll();
      // console.log(a);
      return res.status(200).json({ message: `Admin`, a });
    } catch (error) {
      console.log(`some bad`, error);
    }
  },
  getAdminEvents: async (req, res) => {
    try {
      const a = await adminModel.findAll({
        include: [eventsModel],
      });
      // console.log(a);
      return res.status(200).json({ message: `Admin`, a });
    } catch (error) {
      console.log(`some bad`, error);
    }
  },
  getAdminNews: async (req, res) => {
    try {
      const a = await adminModel.findAll({
        include: [newsModel],
      });
      // console.log(a);
      return res.status(200).json({ message: `Admin`, a });
    } catch (error) {
      console.log(`some bad`, error);
    }
  },
  getAdminNewsComment: async (req, res) => {
    try {
      const a = await adminModel.findAll({
        include: [{ model: newsModel, include: [newsCommentsModel] }],
      });
      // console.log(a);
      return res.status(200).json({ message: `Admin`, a });
    } catch (error) {
      console.log(`some bad`, error);
    }
  },

  getAdminSocialPost: async (req, res) => {
    try {
      const a = await adminModel.findAll({
        include: [socialActivityModel],
      });
      // console.log(a);
      return res.status(200).json({ message: `Social Post`, a });
    } catch (error) {
      console.log(`some bad`, error);
    }
  },
  getAdminSocialComment: async (req, res) => {
    try {
      const a = await adminModel.findAll({
        include: [{ model: socialActivityModel, include: [socialActivityCommentModel] }],
      });
      // console.log(a);
      return res.status(200).json({ message: `Admin`, a });
    } catch (error) {
      console.log(`some bad`, error);
    }
  },

  getone: async (req, res) => {
    try {
      const { id } = req.params;
      const a = await adminModel.findOne({ where: { id } });
      if (!a) {
        return res.status(200).json({ message: `Admin Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `Admin Found Whose Id ${id}`, data: a });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, cnic, phoneNo, address } = req.body;
      const userAdmin = await adminModel.findOne({ where: { id } });
      if (!userAdmin) {
        return res.status(201).json({ message: `Admin Not Found` });
      }
      // if(userAdmin){
      //   return res
      //   .status(400)
      //   .json({ message: `this email ${email} is already exist..` });
      // }
      const userAdmin1 = await adminModel.findOne({ where: { email } });
      if (userAdmin1) {
        return res
          .status(400)
          .json({
            message: `this email ${email} is already exist...Not update this email`,
          });
      }
      const hashpassword = await hash(password, 10);
      (userAdmin.name = name),
        (userAdmin.email = email),
        (userAdmin.password = hashpassword),
        (userAdmin.cnic = cnic),
        (userAdmin.phoneNo = phoneNo),
        (userAdmin.address = address);
      await userAdmin.save();
      return res
        .status(200)
        .json({ message: `Update Successfully`, userAdmin });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  // $2b$10$Evn45ahiyEzyde4EV6y8JOtfYh4Dy3BtYTZqSbxl6KCt6ZAAzgXS2,
  // $2b$10$DG9I5OWXA2Wr5yN7fmwFcuZ77ibEuDvCASuR5z.fGDsFVNWlnb5xq
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const userAdmin = await adminModel.findOne({ where: { id } });
      if (!userAdmin) {
        return res
          .status(201)
          .json({ message: `This ID ${id} Does Not Exist` });
      }
      await userAdmin.destroy();
      return res.status(200).json({ message: `This ID ${id} will be Deleted` });
    } catch (error) {
      return res.status(201).json({ message: `Some Bad Happened...` });
    }
  },
};
export default AdminLoginController;
