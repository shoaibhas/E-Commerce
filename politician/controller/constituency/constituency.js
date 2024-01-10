import constituencyModel from "../../model/constituency/constituency.js";
import pollingStationModel from "../../model/constituency/pollingStation.js";
const ConstituencyController = {
  create: async (req, res) => {
    try {
      const { constituencyName, constituencyAddress } = req.body;
      const constituency1 = await constituencyModel.findOne({
        where: { constituencyName },
      });
      if (constituency1) {
        return res
          .status(400)
          .json({ message: `this  ${constituencyName} is already exist...` });
      }
      const constituency = await constituencyModel.create({
        constituencyName,
        constituencyAddress,
      });
      return res.status(200).json({ message: `Order Create`, constituency });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  get: async (req, res) => {
    const show = await constituencyModel.findAll({
       include: [pollingStationModel],
    });
    res.json(show);
  },
  getall: async (req, res) => {
    try {
      const constituency = await constituencyModel.findAll();
      // console.log(a);
      return res
        .status(200)
        .json({ message: `All constituency`, constituency });
    } catch (error) {
      console.log(`some bad`, error);
      return res.json({ message: `some bad`, error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { constituencyName, constituencyAddress } = req.body;
      const constituency = await constituencyModel.findOne({ where: { id } });
      if (!constituency) {
        return res.status(201).json({ message: `Not Found` });
      }
      // if(constituency){
      //   return res
      //   .status(400)
      //   .json({ message: `this email ${email} is already exist..` });
      // }
      const constituency1 = await constituencyModel.findOne({
        where: { constituencyName },
      });
      if (constituency1) {
        return res
          .status(400)
          .json({
            message: `this ${constituencyName} is already exist...Not update this constituency`,
          });
      }
      (constituency.constituencyName = constituencyName),
        (constituency.constituencyAddress = constituencyAddress),
        await constituency.save();
      return res
        .status(200)
        .json({ message: `Update Successfully`, constituency });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  // $2b$10$Evn45ahiyEzyde4EV6y8JOtfYh4Dy3BtYTZqSbxl6KCt6ZAAzgXS2,
  // $2b$10$DG9I5OWXA2Wr5yN7fmwFcuZ77ibEuDvCASuR5z.fGDsFVNWlnb5xq
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const constituency = await constituencyModel.findOne({ where: { id } });
      if (!constituency) {
        return res
          .status(201)
          .json({ message: `This ID ${id} Does Not Exist` });
      }
      await constituency.destroy();
      return res.status(200).json({ message: `This ID ${id} will be Deleted` });
    } catch (error) {
      return res.status(201).json({ message: `Some Bad Happened...` });
    }
  },
};
export default ConstituencyController;
