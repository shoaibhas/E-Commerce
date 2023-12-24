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
      req.session.token=token;
      req.session.user=user;
      req.session.save()

      return res.status(200).json({ message: `${email} Login Successful`,token,data1 });
    } catch (error) {
      console.log({ message: `some bad happened`, error });
    }
  },
};
export default AdminLoginController;
