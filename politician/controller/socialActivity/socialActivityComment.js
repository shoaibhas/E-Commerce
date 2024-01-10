import socialActivityCommentModel from "../../model/socialActivity/socialActivityCommentModel.js";

const socialActivityCommentController = {
  create: async (req, res) => {
    try {
      const { comment, newsId } = req.body;
      const comm = await socialActivityCommentModel.create({
        comment,
      });
      return res.status(200).json({ message: `Social comment Create`, comm });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  getall: async (req, res) => {
    try {
      const comm = await socialActivityCommentModel.findAll();
      return res.status(200).json({ message: `Social comment`, comm });
    } catch (error) {
      return res.json({ message: `some bad happened`, error });
    }
  },
  getone: async (req, res) => {
    try {
      const { id } = req.params;
      const comm = await socialActivityCommentModel.findOne({ where: { id } });
      if (!comm) {
        return res.status(200).json({ message: `Social comment Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `Social comment Found Whose Id ${id}`, comm });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { comment } = req.body;
      const comm = await socialActivityCommentModel.findOne({
        where: { id },
      });
      if (!comm) {
        return res.status(201).json({ message: `Not Found` });
      }
      (comm.comment = comment),
        // console.log(news);
        await comm.save();
      return res.status(200).json({ message: `Update Successfully`, comm });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const comm = await socialActivityCommentModel.findOne({ where: { id } });
      if (!comm) {
        return res.status(201).json({ message: `Social comment Not Found` });
      }
      await comm.destroy();
      return res.status(200).json({ message: `Delete Social comment` });
    } catch (error) {
      return res.status(400).json({ message: `some bad happened`, error });
    }
  },
};
export default socialActivityCommentController;
