import Joi from "joi";
const socialActivityValidator = {
  create: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        picture: Joi.string().required(),
        socialLike: Joi.string().required(),

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

export default socialActivityValidator;
