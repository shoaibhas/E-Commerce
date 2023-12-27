import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";
import productModel from "../products/product.js";

const productCategoryModel = sequelizes.define("category", {
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
productCategoryModel.hasMany(productModel)
productModel.belongsTo(productCategoryModel)
// productCategoryModel.hasMany(productModel)
// productModel.belongsTo(productCategoryModel)
export default productCategoryModel;
