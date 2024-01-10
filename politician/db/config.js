import { Sequelize } from "sequelize";
const envData = process.env;
const sequelizes = new Sequelize(
  envData.DB_NAME,
  envData.DB_USER,
  envData.DB_PASSWORD,
  {
    host: envData.DB_HOST,
    port: envData.DB_PORT,
    dialect: envData.DB_DIALECT,
    logging: false,
  }
);
export const connectDB = async () => {
  try {
    await sequelizes.authenticate();
    console.log("Connection Successful");
  } catch (err) {
    console.log("Not Connect", err);
  }
};
export default sequelizes;
