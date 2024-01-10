import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";
// import socialActivityLikeModel from "./socialActivityLikeModel.js";
import socialActivityCommentModel from "./socialActivityCommentModel.js";

const socialActivityModel = sequelizes.define("social_activity", {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  socialLike: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:0
  },
});
// socialActivityModel.hasMany(socialActivityLikeModel)
// socialActivityLikeModel.belongsTo(socialActivityModel)
socialActivityModel.hasMany(socialActivityCommentModel)
socialActivityCommentModel.belongsTo(socialActivityModel)
export default socialActivityModel;
