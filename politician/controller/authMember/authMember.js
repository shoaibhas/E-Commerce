import { compare, hash } from "bcrypt";
import Jwt from "jsonwebtoken";
import membersModel from "../../model/members/members.js";
import eventsModel from "../../model/events/events.js";
import newsModel from "../../model/news/news.js";
import newsCommentsModel from "../../model/news/newsCommentModel.js";
import socialActivityModel from "../../model/socialActivity/socialActivity.js";
import socialActivityCommentModel from "../../model/socialActivity/socialActivityCommentModel.js";
const MemberLoginController = {
  register: async (req, res) => {
    try {
      const { name, cnic, email, password,phoneNo,address } = req.body;
      const userMember = await membersModel.findOne({
        where: { email },
      });
      if (userMember) {
        return res
          .status(400)
          .json({ message: `this email ${email} is already exist...` });
      }
      const hashPassword = await hash(password, 10);
      await membersModel.create({
        name,
        email,
        password:hashPassword,
        cnic,
        phoneNo,
        address
      });
      res
        .status(200)
        .json({ message: `Member Registered=========>${name}` });
        console.log(res);
    } catch (error) {
      console.log(error);
      return res.json({ message: `some bad happened`, error });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userMember = await membersModel.findOne({ where: { email } });
      if (!userMember) {
        return res.status(401).json({ message: `Invalid Email=====>${email}` });
      }
      const comparePassword = await compare(password, userMember.password);
      console.log(comparePassword);
      if (!comparePassword) {
        return res
          .status(401)
          .json({ message: `Invalid Password=====>${password}` });
      }

      //json web token implement
      const dataMember = {
        id: userMember.id,
        email: userMember.email,
      };
      const token = Jwt.sign(dataMember, process.env.JSON_SECRET, {
        expiresIn: "1h",
      });
      req.session.token = token;
      req.session.userMember = userMember;
      req.session.save();

      return res
        .status(200)
        .json({ message: `${email} Login Successful`, token, dataMember });
    } catch (error) {
      console.log({ message: `some bad happened`, error });
    }
  },
  getall: async (req, res) => {
    try {
      const a = await membersModel.findAll();
      // console.log(a);
      return res.status(200).json({ message: `Member`, a });
    } catch (error) {
      console.log(`some bad`, error);
    }
  },
  getMemberEvent: async (req, res) => {
    try {
      const a = await membersModel.findAll({
      include:[eventsModel]
      });
      // console.log(a);
      return res.status(200).json({ message: `Member`, a });
    } catch (error) {
      console.log(`some bad`, error);
    }
  },
  getone: async (req, res) => {
    try {
      const { id } = req.params;
      const a = await membersModel.findOne({ where: { id } });
      if (!a) {
        return res.status(200).json({ message: `Member Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `Member Found Whose Id ${id}`, data: a });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  getoneMemberEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const a = await membersModel.findByPk(id,{
        include:[eventsModel]
      });
      if (!a) {
        return res.status(200).json({ message: `Member Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `Member Found Whose Id ${id}`, data: a });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  getoneMemberNews: async (req, res) => {
    try {
      const { id } = req.params;
      const a = await membersModel.findByPk(id,{
        include:[newsModel]
      });
      if (!a) {
        return res.status(200).json({ message: `News Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `Member Found Whose Id ${id}`, data: a });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  getoneMemberNewsComment: async (req, res) => {
    try {
      const { id } = req.params;
      const a = await membersModel.findByPk(id,{
        include:[{model:newsModel,include:[newsCommentsModel]}]
      });
      if (!a) {
        return res.status(200).json({ message: `News Comment Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `Member Found Whose Id ${id}`, data: a });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },

  getoneMemberSocialPost: async (req, res) => {
    try {
      const { id } = req.params;
      const a = await membersModel.findByPk(id,{
        include:[socialActivityModel]
      });
      if (!a) {
        return res.status(200).json({ message: `Social Post Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `Social Post Found Whose Id ${id}`, data: a });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  getoneMembersocialPostComment: async (req, res) => {
    try {
      const { id } = req.params;
      const a = await membersModel.findByPk(id,{
        include:[{model:socialActivityModel,include:[socialActivityCommentModel]}]
      });
      if (!a) {
        return res.status(200).json({ message: `Social Comment Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `Social Post Found Whose Id ${id}`, data: a });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, cnic, phoneNo, address } =
        req.body;
      const userMember = await membersModel.findOne({ where: { id } });
      if (!userMember) {
        return res.status(201).json({ message: `Member Not Found` });
      }
      // if(userMember){
      //   return res
      //   .status(400)
      //   .json({ message: `this email ${email} is already exist..` });
      // }
      const userMember1 = await membersModel.findOne({ where: { email } });
      if (userMember1) {
        return res
          .status(400)
          .json({ message: `this email ${email} is already exist...Not update this email` });
      }
      const hashpassword = await hash(password, 10);
      (userMember.name = name),
        (userMember.email = email),
        (userMember.password = hashpassword),
        (userMember.cnic = cnic),
        (userMember.phoneNo = phoneNo),
        (userMember.address = address);
      await userMember.save();
      return res.status(200).json({ message: `Update Successfully`, userMember });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  // $2b$10$Evn45ahiyEzyde4EV6y8JOtfYh4Dy3BtYTZqSbxl6KCt6ZAAzgXS2,
  // $2b$10$DG9I5OWXA2Wr5yN7fmwFcuZ77ibEuDvCASuR5z.fGDsFVNWlnb5xq
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const userMember = await membersModel.findOne({ where: { id } });
      if (!userMember) {
        return res
          .status(201)
          .json({ message: `This ID ${id} Does Not Exist` });
      }
      await userMember.destroy();
      return res.status(200).json({ message: `This ID ${id} will be Deleted` });
    } catch (error) {
      return res.status(201).json({ message: `Some Bad Happened...` });
    }
  },
};
export default MemberLoginController;
