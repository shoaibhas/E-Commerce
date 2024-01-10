import socialActivityModel from "../../model/socialActivity/socialActivity.js";
import socialActivityCommentModel from "../../model/socialActivity/socialActivityCommentModel.js";


const socialActivityController = {
  create: async (req, res) => {
    try {
      const { title, description, picture } = req.body;
      const socialactivity = await socialActivityModel.create({
        title,
        description,
        picture,
        // totalLike,
        adminId: req.session.userAdmin?.id,
        memberId: req.session.userMember?.id,
      });
      return res.status(200).json({ message: `Social Post Create`, socialactivity });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  getall: async (req, res) => {
    try {
      const socialactivity = await socialActivityModel.findAll();
      return res.status(200).json({ message: `Your Social Post`, socialactivity });
    } catch (error) {
      return res.json({ message: `some bad happened`, error });
    }
  },
  // getallNewsComment: async (req, res) => {
  //   try {
  //     const socialactivity = await socialactivityModel.findAll({
  //       include: [socialactivityCommentsModel],
  //     });
  //     return res.status(200).json({ message: `Your Newses`, socialactivity });
  //   } catch (error) {
  //     return res.json({ message: `some bad happened`, error });
  //   }
  // },
  getoneSocialComment: async (req, res) => {
    try {
      const { id } = req.params;
      const socialactivity = await socialActivityModel.findByPk(id, {
        include: [socialActivityCommentModel],
      });
      return res.status(200).json({ message: `Your Comment`, socialactivity });
    } catch (error) {
      return res.json({ message: `some bad happened`, error });
    }
  },
  getone: async (req, res) => {
    try {
      const { id } = req.params;
      const socialactivity = await socialActivityModel.findOne({ where: { id } });
      if (!socialactivity) {
        return res.status(200).json({ message: `Social Post Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `Social Post Found Whose Id ${id}`, socialactivity });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, picture } = req.body;
      const socialactivity = await socialActivityModel.findOne({
        where: { id },
      });
      if (!socialactivity) {
        return res.status(201).json({ message: `Not Found` });
      }
      (socialactivity.title = title),
        (socialactivity.description = description),
        (socialactivity.picture = picture),
        (socialactivity.adminId = req.session.userAdmin?.id);
      socialactivity.memberId = req.session.userMember?.id;
      // console.log(socialactivity);
      await socialactivity.save();
      return res.status(200).json({ message: `Update Successfully`, socialactivity });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },

  updateTotalLike: async (req, res) => {
    try {
      const { id } = req.params;
      const { socialLike } = req.body;
      const socialactivity = await socialActivityModel.findOne({
        where: { id },
      });
      if (!socialactivity) {
        return res.status(201).json({ message: `Not Found` });
      }
      (socialactivity.socialLike = socialLike),
        // console.log(socialactivity);
        await socialactivity.save();
      return res.status(200).json({ message: `Update Successfully`, socialactivity });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const socialactivity = await socialActivityModel.findOne({ where: { id } });
      if (!socialactivity) {
        return res.status(201).json({ message: `Social Post Not Found` });
      }
      await socialactivity.destroy();
      return res.status(200).json({ message: `Delete Social Post` });
    } catch (error) {
      return res.status(400).json({ message: `some bad happened`, error });
    }
  },
};
export default socialActivityController;
