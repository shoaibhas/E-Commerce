import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";

const newsCommentsModel = sequelizes.define("news_comment", {
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export default newsCommentsModel;
