import Joi from "joi";
const adminLoginValidator = {
  register: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required(),
        cnic: Joi.string().min(2).max(15).required(),
        phoneNo: Joi.string().required(),
        address: Joi.string().required(),

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

export default adminLoginValidator;
