import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";

const pollingStationModel = sequelizes.define("polling_station", {
  pollingStationAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pollingStationName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  agentName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  agentCnic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  agentPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export default pollingStationModel;
