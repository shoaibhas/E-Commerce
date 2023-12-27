import Joi from "joi";
const adminLoginValidator = {
  register: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        email: Joi.string().email(),
        password: Joi.string().min(3).max(20).required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({ message: ('Invalid'), error });
      }
      next();
    } catch (error) {
      res.status(500).json({ error, message: `some bad happened`, error });
    }
  },
};

export default adminLoginValidator;
