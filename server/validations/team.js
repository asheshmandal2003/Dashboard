import Joi from "joi";

export const validateTeam = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Name should be a type of text",
      "string.empty": "Name cannot be an empty field",
      "any.required": "Name is a required field",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
