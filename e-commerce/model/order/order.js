import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";

const orderModel = sequelizes.define("order", {
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderItems: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export default orderModel;
