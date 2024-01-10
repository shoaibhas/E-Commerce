import newsCommentsModel from "../../model/news/newsCommentModel.js";

const newsCommentController = {
  create: async (req, res) => {
    try {
      const { comment, newsId } = req.body;
      const comm = await newsCommentsModel.create({
        comment,
      });
      return res.status(200).json({ message: `News comment Create`, comm });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  getall: async (req, res) => {
    try {
      const comm = await newsCommentsModel.findAll();
      return res.status(200).json({ message: `Newses comment`, comm });
    } catch (error) {
      return res.json({ message: `some bad happened`, error });
    }
  },
  getone: async (req, res) => {
    try {
      const { id } = req.params;
      const comm = await newsCommentsModel.findOne({ where: { id } });
      if (!comm) {
        return res.status(200).json({ message: `News comment Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `News comment Found Whose Id ${id}`, comm });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { comment } = req.body;
      const comm = await newsCommentsModel.findOne({
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
      const comm = await newsCommentsModel.findOne({ where: { id } });
      if (!comm) {
        return res.status(201).json({ message: `News comment Not Found` });
      }
      await comm.destroy();
      return res.status(200).json({ message: `Delete News comment` });
    } catch (error) {
      return res.status(400).json({ message: `some bad happened`, error });
    }
  },
};
export default newsCommentController;
