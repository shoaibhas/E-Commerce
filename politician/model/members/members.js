import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";
import eventsModel from "../events/events.js";
import newsModel from "../news/news.js";
// import newsLikeModel from "../news/newsLikeSModel.js";
// import newsCommentsModel from "../news/newsCommentModel.js";
import socialActivityModel from "../socialActivity/socialActivity.js";
// import socialActivityLikeModel from "../socialActivity/socialActivityLikeModel.js";
// import socialActivityCommentModel from "../socialActivity/socialActivityCommentModel.js";

const membersModel = sequelizes.define("members", {
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
membersModel.hasMany(eventsModel);
eventsModel.belongsTo(membersModel);
membersModel.hasMany(newsModel);
newsModel.belongsTo(membersModel);
// membersModel.hasMany(newsLikeModel);
// newsLikeModel.belongsTo(membersModel);
// membersModel.hasMany(newsCommentsModel);
// newsCommentsModel.belongsTo(membersModel);
membersModel.hasMany(socialActivityModel);
socialActivityModel.belongsTo(membersModel);
// membersModel.hasMany(socialActivityLikeModel);
// socialActivityLikeModel.belongsTo(membersModel);
// membersModel.hasMany(socialActivityCommentModel);
// socialActivityCommentModel.belongsTo(membersModel);
export default membersModel;
