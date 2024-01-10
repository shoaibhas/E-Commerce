import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";

const socialActivityCommentModel = sequelizes.define(
  "social_activity_comment",
  {
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }
);
export default socialActivityCommentModel;
