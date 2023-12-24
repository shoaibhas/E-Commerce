import adminModel from "../model/admin/admin.js";
import customerModel from "../model/productCategory/productCategory.js";
import orderModel from "../model/order/order.js";
import productModel from "../model/products/product.js";
const initDB = async () => {
  await adminModel.sync({
    alter: true,
    force: false,
  });
  await customerModel.sync({
    alter: true,
    force: false,
  });
  await orderModel.sync({
    alter: true,
    force: false,
  });
  await productModel.sync({
    alter: true,
    force: false,
  });
};
export default initDB;
