import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";
import eventsModel from "../events/events.js";
import newsModel from "../news/news.js";
// import newsLikeModel from "../news/newsLikeSModel.js";
// import newsCommentsModel from "../news/newsCommentModel.js";
import socialActivityModel from "../socialActivity/socialActivity.js";
// import socialActivityLikeModel from "../socialActivity/socialActivityLikeModel.js";
// import socialActivityCommentModel from "../socialActivity/socialActivityCommentModel.js";

const adminModel = sequelizes.define("admin", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cnic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
adminModel.hasMany(eventsModel);
eventsModel.belongsTo(adminModel);
adminModel.hasMany(newsModel);
newsModel.belongsTo(adminModel);
// adminModel.hasMany(newsLikeModel);
// newsLikeModel.belongsTo(adminModel);
// adminModel.hasMany(newsCommentsModel);
// newsCommentsModel.belongsTo(adminModel);
adminModel.hasMany(socialActivityModel);
socialActivityModel.belongsTo(adminModel);
// adminModel.hasMany(socialActivityLikeModel);
// socialActivityLikeModel.belongsTo(adminModel);
// adminModel.hasMany(socialActivityCommentModel);
// socialActivityCommentModel.belongsTo(adminModel);

export default adminModel;
