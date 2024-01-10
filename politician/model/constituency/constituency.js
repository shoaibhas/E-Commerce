import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";
import pollingStationModel from "./pollingStation.js";
// import pollingStationModel from "./pollingStation.js";

const constituencyModel = sequelizes.define("constituency", {
  constituencyName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  constituencyAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
constituencyModel.hasMany(pollingStationModel);
pollingStationModel.belongsTo(constituencyModel);
export default constituencyModel;
