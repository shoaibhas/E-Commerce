import constituencyModel from "../../model/constituency/constituency.js";
import pollingStationModel from "../../model/constituency/pollingStation.js";

const PollingStationController = {
  create: async (req, res) => {
    try {
      const {
        pollingStationAddress,
        pollingStationName,
        agentName,
        agentCnic,
        agentPhone,
      } = req.body;
      const pollingStation1 = await pollingStationModel.findOne({
        where: { pollingStationName },
      });
      if (pollingStation1) {
        return res
          .status(400)
          .json({ message: `this  ${pollingStationName} is already exist...` });
      }
      const pollingstation = await pollingStationModel.create({
        pollingStationAddress,
        pollingStationName,
        agentName,
        agentCnic,
        agentPhone,
      });
      return res
        .status(200)
        .json({ message: `Polling Station Create`, pollingstation });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },

  getall: async (req, res) => {
    try {
      const pollingstation = await pollingStationModel.findAll();
      
      // console.log(a);
      return res
        .status(200)
        .json({ message: `All pollingstation`, pollingstation });
    } catch (error) {
      console.log(`some bad`, error);
      return res.json({ message: `some bad`, error });
    }
  },
 
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        pollingStationAddress,
        pollingStationName,
        agentName,
        agentCnic,
        agentPhone,
      } = req.body;
      const pollingstation = await pollingStationModel.findOne({
        where: { id },
      });
      if (!pollingstation) {
        return res.status(201).json({ message: `Not Found` });
      }
      // if(pollingstation){
      //   return res
      //   .status(400)
      //   .json({ message: `this email ${email} is already exist..` });
      // }
      const pollingstation1 = await pollingStationModel.findOne({
        where: { pollingStationName },
      });
      if (pollingstation1) {
        return res.status(400).json({
          message: `this ${pollingStationName} is already exist...Not update this pollingstation`,
        });
      }
      (pollingstation.pollingStationName = pollingStationName),
        (pollingstation.pollingStationAddress = pollingStationAddress),
        (pollingstation.agentName = agentName),
        (pollingstation.agentCnic = agentCnic),
        (pollingstation.agentPhone = agentPhone),
        await pollingstation.save();
      return res
        .status(200)
        .json({ message: `Update Successfully`, pollingstation });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  // $2b$10$Evn45ahiyEzyde4EV6y8JOtfYh4Dy3BtYTZqSbxl6KCt6ZAAzgXS2,
  // $2b$10$DG9I5OWXA2Wr5yN7fmwFcuZ77ibEuDvCASuR5z.fGDsFVNWlnb5xq
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const pollingstation = await pollingStationModel.findOne({ where: { id } });
      if (!pollingstation) {
        return res
          .status(201)
          .json({ message: `This ID ${id} Does Not Exist` });
      }
      await pollingstation.destroy();
      return res.status(200).json({ message: `This ID ${id} will be Deleted` });
    } catch (error) {
      return res.status(201).json({ message: `Some Bad Happened...` });
    }
  },
};
export default PollingStationController;
