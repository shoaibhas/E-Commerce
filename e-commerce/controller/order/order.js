import orderModel from "../../model/order/order.js";

const orderController = {
  create: async (req, res) => {
    try {
      const { orderStatus, customerName, customerAddress, orderItems } =
        req.body;
      const order = await orderModel.create({
        orderStatus,
        customerName,
        customerAddress,
        orderItems,
      });
      return res.status(200).json({ message: `Order Create`, order });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  get: async (req, res) => {
    try {
      const order = await orderModel.findAll();
      return res.status(200).json({ message: `Your Orders`, order });
    } catch (error) {
      return res.json({ message: `some bad happened`, error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await orderModel.findOne({ where: { id } });
      if (!order) {
        return res.status(201).json({ message: `Order Not Found` });
      }
      await order.destroy();
      return res.status(200).json({ message: `Delete Order` });
    } catch (error) {
      return res.status(400).json({ message: `some bad happened`, error });
    }
  },
};
export default orderController;
