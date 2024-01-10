import newsModel from "../../model/news/news.js";
import newsCommentsModel from "../../model/news/newsCommentModel.js";

const newsController = {
  create: async (req, res) => {
    try {
      const { newsTitle, newsContent, newsPicture } = req.body;
      const news = await newsModel.create({
        newsTitle,
        newsContent,
        newsPicture,
        // totalLike,
        adminId: req.session.userAdmin?.id,
        memberId: req.session.userMember?.id,
      });
      return res.status(200).json({ message: `News Create`, news });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  getall: async (req, res) => {
    try {
      const news = await newsModel.findAll();
      return res.status(200).json({ message: `Your Newses`, news });
    } catch (error) {
      return res.json({ message: `some bad happened`, error });
    }
  },
  // getallNewsComment: async (req, res) => {
  //   try {
  //     const news = await newsModel.findAll({
  //       include: [newsCommentsModel],
  //     });
  //     return res.status(200).json({ message: `Your Newses`, news });
  //   } catch (error) {
  //     return res.json({ message: `some bad happened`, error });
  //   }
  // },
  getoneNewsComment: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await newsModel.findByPk(id, {
        include: [newsCommentsModel],
      });
      return res.status(200).json({ message: `Your Newses`, news });
    } catch (error) {
      return res.json({ message: `some bad happened`, error });
    }
  },
  getone: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await newsModel.findOne({ where: { id } });
      if (!news) {
        return res.status(200).json({ message: `News Not Fount` });
      }
      return res
        .status(200)
        .json({ message: `News Found Whose Id ${id}`, news });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { newsTitle, newsContent, newsPicture } = req.body;
      const news = await newsModel.findOne({
        where: { id },
      });
      if (!news) {
        return res.status(201).json({ message: `Not Found` });
      }
      (news.newsTitle = newsTitle),
        (news.newsContent = newsContent),
        (news.newsPicture = newsPicture),
        (news.adminId = req.session.userAdmin?.id);
      news.memberId = req.session.userMember?.id;
      // console.log(news);
      await news.save();
      return res.status(200).json({ message: `Update Successfully`, news });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },

  updateTotalLike: async (req, res) => {
    try {
      const { id } = req.params;
      const { totalLike } = req.body;
      const news = await newsModel.findOne({
        where: { id },
      });
      if (!news) {
        return res.status(201).json({ message: `Not Found` });
      }
      (news.totalLike = totalLike),
        // console.log(news);
        await news.save();
      return res.status(200).json({ message: `Update Successfully`, news });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await newsModel.findOne({ where: { id } });
      if (!news) {
        return res.status(201).json({ message: `News Not Found` });
      }
      await news.destroy();
      return res.status(200).json({ message: `Delete News` });
    } catch (error) {
      return res.status(400).json({ message: `some bad happened`, error });
    }
  },
};
export default newsController;
