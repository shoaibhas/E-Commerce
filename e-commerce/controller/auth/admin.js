import { compare, hash } from "bcrypt";
import adminModel from "../../model/admin/admin.js";
import Jwt from "jsonwebtoken";
const AdminLoginController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = await adminModel.findOne({
        where: { email },
      });
      if (user) {
        return res
          .status(400)
          .json({ message: `this email ${email} is already exist...` });
      }
      const hashPassword = await hash(password, 10);
      await adminModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      res
        .status(200)
        .json({ message: `User Registered=========>${firstName}` });
    } catch (error) {
      console.log({ message: `some bad happened`, error });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await adminModel.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: `Invalid Email=====>${email}` });
      }
      const comparePassword = await compare(password, user.password);
      console.log(comparePassword);
      if (!comparePassword) {
        return res
          .status(401)
          .json({ message: `Invalid Password=====>${password}` });
      }

      //json web token implement
      const data1 = {
        id: user.id,
        email: user.email,
      };
      const token = Jwt.sign(data1, process.env.JSON_SECRET, {
        expiresIn: "1h",
      });
      req.session.token = token;
      req.session.user = user;
      req.session.save();

      return res
        .status(200)
        .json({ message: `${email} Login Successful`, token, data1 });
    } catch (error) {
      console.log({ message: `some bad happened`, error });
    }
  },
  getall: async (req, res) => {
    try {
      const a = await adminModel.findAll();
      // console.log(a);
      return res.status(200).json({ message: `Get All Users`, a });
    } catch (error) {
      console.log(`some bad`, error);
    }
  },
  getone: async (req, res) => {
    try {
      const { id } = req.params;
      const a = await adminModel.findOne({ where: { id } });
      if (!a) {
        return res.status(201).json({ message: `User Not Fount` });
      }
      return res.status(200).json({ message: `User Found Whose Id ${id}`, a });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, password, cnic, phone, address } =
        req.body;
      const user = await adminModel.findOne({ where: { id } });
      if (!user) {
        return res.status(201).json({ message: `User Not Found` });
      }
      // if(user){
      //   return res
      //   .status(400)
      //   .json({ message: `this email ${email} is already exist..` });
      // }
      const hashpassword = await hash(password, 10);
      (user.firstName = firstName),
        (user.lastName = lastName),
        (user.email = email),
        (user.password = hashpassword),
        (user.cnic = cnic),
        (user.phone = phone),
        (user.address = address);
      await user.save();
      return res.status(200).json({ message: `Update Successfully`, user });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  // $2b$10$Evn45ahiyEzyde4EV6y8JOtfYh4Dy3BtYTZqSbxl6KCt6ZAAzgXS2,
  // $2b$10$DG9I5OWXA2Wr5yN7fmwFcuZ77ibEuDvCASuR5z.fGDsFVNWlnb5xq
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await adminModel.findOne({ where: { id } });
      if (!user) {
        return res
          .status(201)
          .json({ message: `This ID ${id} Does Not Exist` });
      }
      await user.destroy();
      return res.status(200).json({ message: `This ID ${id} will be Deleted` });
    } catch (error) {
      return res.status(201).json({ message: `Some Bad Happened` });
    }
  },
};
export default AdminLoginController;
