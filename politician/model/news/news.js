import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";
// import newsLikeModel from "./newsLikeSModel.js";
import newsCommentsModel from "./newsCommentModel.js";

const newsModel = sequelizes.define("news", {
  newsTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  newsContent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalLike: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:0
  },
  newsPicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
// newsModel.hasMany(newsLikeModel)
// newsLikeModel.belongsTo(newsModel)
newsModel.hasMany(newsCommentsModel);
newsCommentsModel.belongsTo(newsModel);
export default newsModel;
