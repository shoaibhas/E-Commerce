import { DataTypes } from "sequelize";
import sequelizes from "../../db/config.js";

const eventsModel = sequelizes.define("event", {
  eventTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eventDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eventDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eventImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export default eventsModel;
