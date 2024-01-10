import Joi from "joi";
const pollingStationValidator = {
  create: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        pollingStationAddress: Joi.string().required(),
        pollingStationName: Joi.string().required(),
        agentName: Joi.string().required(),
        agentCnic: Joi.string().min(15).max(15).required(),
        agentPhone: Joi.string().required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({ message: ('Invalid hai'), error });
      }
      next();
    } catch (error) {
      res.status(500).json({ error, message: `some bad happened`, error });
    }
  },
};

export default pollingStationValidator;
