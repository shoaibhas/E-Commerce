import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";

const productModel = sequelizes.define("product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stockQuantity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export default productModel;
